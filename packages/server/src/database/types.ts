import { Repository } from "typeorm";
import { User } from "../entity/User";

export interface Database {
    users: Repository<User>;
}
