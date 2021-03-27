import dayjs from "dayjs";
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { Stripe } from "../../../api";
import { AppContext } from "../../../middlewares/apollo/types";
import { Booking, Listing } from "../../entities";
import { ValidAntiForgeryToken } from "../../middlewares";
import { CreateBookingArgs } from "./types";

@Resolver(Booking)
export class BookingResolver {
    @Mutation(() => Booking)
    @Authorized()
    @UseMiddleware(ValidAntiForgeryToken)
    async createBooking(
        @Ctx() ctx: AppContext,
        @Arg("input") input: CreateBookingArgs
    ): Promise<Booking> {
        try {
            const { id, source, checkIn, checkOut } = input;

            const listing = await Listing.findOne(id);

            if (!listing) {
                throw new Error("Listing can't be found");
            }

            if (listing.hostId === ctx.req.user!.id) {
                throw new Error("User can't book own listing");
            }

            const today = dayjs();
            const checkInDate = dayjs(checkIn);
            const checkOutDate = dayjs(checkOut);
            const maxStayDate = dayjs(today.add(listing.maxStay, "day"));
            const minStayDate = checkInDate.add(listing.minStay, "day");

            if (checkInDate.isAfter(today.add(90, "day"))) {
                throw new Error(
                    "check in date can't be more than 90 days from today"
                );
            }

            if (checkOutDate.isSameOrAfter(minStayDate)) {
                throw new Error(
                    `check out date must be after a minimum stay of ${listing.minStay}`
                );
            }

            if (checkOutDate.isAfter(maxStayDate)) {
                throw new Error(
                    `check out date can't be more than ${listing.maxStay} days from today`
                );
            }

            const totalPrice =
                listing.price * (checkOutDate.diff(checkInDate, "day") + 1);

            const host = await listing.host;

            if (!host || !host.walletId) {
                throw new Error(
                    "the host either can't be found or is not connected with Stripe"
                );
            }

            await Stripe.charge(totalPrice, source, host.walletId);

            const booking = Booking.create({
                checkIn,
                checkOut,
                tenantId: host.id,
                listingId: listing.id
            });

            await booking.save();

            host.income = host.income + totalPrice;

            await host.save();

            return booking;
        } catch (error) {
            throw new Error(`Failed to create a booking: ${error}`);
        }
    }
}
