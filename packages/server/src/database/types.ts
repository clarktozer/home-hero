import { Repository } from "typeorm";
import { Booking, Listing, User } from "../entity";

export interface Database {
    users: Repository<User>;
    bookings: Repository<Booking>;
    listings: Repository<Listing>;
}
