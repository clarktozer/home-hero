import { Query, Resolver } from "type-graphql";
import { Booking } from "../../entity";

@Resolver()
export class BookingResolver {
    @Query(() => [Booking])
    async bookings(): Promise<Booking[]> {
        return await Booking.find();
    }
}
