import { Field, ID, Int, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import { BaseAccount } from "../BaseUser";
import { Booking } from "../Booking";
import { Listing } from "../Listing";
import { SocialAccount } from "../SocialAccount";

@Entity("users")
@ObjectType()
@Unique(["email"])
export class User extends BaseAccount {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => Int)
    @Column("integer", { default: 0 })
    income: number;

    @OneToMany(() => Booking, booking => booking.tenant)
    bookings: Promise<Booking[]>;

    @OneToMany(() => Listing, listing => listing.host)
    listings: Promise<Listing[]>;

    @Field(() => [SocialAccount])
    @OneToMany(() => SocialAccount, account => account.user)
    socials: Promise<SocialAccount[]>;
}
