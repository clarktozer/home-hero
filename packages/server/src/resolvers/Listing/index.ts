import { Query, Resolver } from "type-graphql";
import { Listing } from "../../entity";

@Resolver()
export class ListingResolver {
    @Query(() => [Listing])
    async listings(): Promise<Listing[]> {
        return await Listing.find();
    }
}
