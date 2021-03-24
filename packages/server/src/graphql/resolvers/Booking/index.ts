import { Query, Resolver } from "type-graphql";
import { Booking } from "../../entities";

@Resolver(Booking)
export class BookingResolver {
    @Query(() => [Booking])
    async bookings(): Promise<Booking[]> {
        return await Booking.find();
    }
}
