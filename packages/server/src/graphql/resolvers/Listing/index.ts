import {
    Args,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { Cloudinary, Google } from "../../../api";
import { AppContext } from "../../../middlewares/apollo/types";
import { Listing, User } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";
import { HostListingArgs } from "./types";

@Resolver()
export class ListingResolver {
    @Query(() => [Listing])
    async listings(): Promise<Listing[]> {
        return await Listing.find();
    }

    @Mutation(() => Listing)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async hostListing(
        @Ctx() ctx: AppContext,
        @Args() input: HostListingArgs
    ): Promise<Listing | null> {
        try {
            const user = await User.findOne(ctx.req.user!.id);

            if (!user) {
                throw new Error("User could not be found");
            }

            const { country, admin, city } = await Google.geocode(
                input.address
            );

            if (!country || !admin || !city) {
                throw new Error("Invalid address input");
            }

            const imageUrl = await Cloudinary.upload(input.image);

            const listing = Listing.create({
                ...input,
                image: imageUrl,
                country,
                admin,
                city
            });

            listing.host = Promise.resolve(user);

            await listing.save();

            return listing;
        } catch (error) {
            throw new Error(
                `Failed to create listing: ${JSON.stringify(error)}`
            );
        }
    }
}
