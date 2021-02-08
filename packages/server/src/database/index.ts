import { createConnection } from "typeorm";
import { Booking, Listing, User } from "../entity";
import { Database } from "./types";

export const connectDatabase = async (): Promise<Database> => {
    const connection = await createConnection();

    return {
        users: connection.getRepository(User),
        bookings: connection.getRepository(Booking),
        listings: connection.getRepository(Listing)
    };
};
