import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { Database } from "./types";

export const connectDatabase = async (): Promise<Database> => {
    const connection = await createConnection();

    return {
        users: connection.getRepository(User),
    };
};
