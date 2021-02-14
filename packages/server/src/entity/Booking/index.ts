import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Listing } from "../Listing";
import { User } from "../User";

@Entity("bookings")
@ObjectType()
export class Booking extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => Listing)
    @ManyToOne(() => Listing, listing => listing.bookings)
    listing: Promise<Listing>;

    @Field(() => User)
    @ManyToOne(() => User, user => user.bookings)
    tenant: Promise<User>;

    @Field()
    @Column("date")
    checkIn: Date;

    @Field()
    @Column("date")
    checkOut: Date;
}
