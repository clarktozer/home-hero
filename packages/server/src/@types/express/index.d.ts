import "express";
import { IUser } from "../../graphql/entities/User/types";

declare module "express" {
    interface Request {
        user?: IUser;
    }
}
