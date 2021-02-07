import { Query, Resolver } from "type-graphql";
import { Listing } from "../../entity";

@Resolver()
export class ListingResolver {
    @Query(() => [Listing])
    async allTypes(): Promise<Listing[]> {
        return await Listing.find();
    }
}
