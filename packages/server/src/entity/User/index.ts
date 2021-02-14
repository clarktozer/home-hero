import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Booking } from "../Booking";
import { Listing } from "../Listing";

@Entity("users")
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn("text")
    id: string;

    @Field()
    @Column("text")
    token: string;

    @Field()
    @Column("text")
    name: string;

    @Field()
    @Column("text")
    avatar: string;

    @Field()
    @Column("text")
    contact: string;

    @Field()
    @Column("integer")
    income: number;

    @Field(() => [Booking])
    @OneToMany(() => Booking, booking => booking.tenant)
    bookings: Promise<Booking[]>;

    @Field(() => [Listing])
    @OneToMany(() => Listing, listing => listing.host)
    listings: Promise<Listing[]>;
}
