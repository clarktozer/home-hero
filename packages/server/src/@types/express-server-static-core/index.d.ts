import "express-serve-static-core";
import { IUser } from "../../graphql/entities/User/types";

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser;
    }
}
