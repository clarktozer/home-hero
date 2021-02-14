import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Booking } from "../Booking";
import { User } from "../User";
import { ListingType } from "./types";

registerEnumType(ListingType, {
    name: "ListingType"
});

@Entity("listings")
@Index(["country", "admin", "city"])
@ObjectType()
export class Listing extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column("varchar", { length: 100 })
    title: string;

    @Field()
    @Column("varchar", { length: 5000 })
    description: string;

    @Field()
    @Column("text")
    image: string;

    @Field(() => ListingType)
    @Column({ type: "enum", enum: ListingType })
    type: ListingType;

    @Field()
    @Column("text")
    address: string;

    @Field()
    @Column("text")
    country: string;

    @Field()
    @Column("text")
    admin: string;

    @Field()
    @Column("text")
    city: string;

    @Field()
    @Column("integer")
    price: number;

    @Field(() => Int)
    @Column("integer")
    guests: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.listings)
    host: Promise<User>;

    @Field(() => [Booking])
    @OneToMany(() => Booking, booking => booking.listing)
    bookings: Promise<Booking[]>;
}
