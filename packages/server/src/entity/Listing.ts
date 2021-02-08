import { MaxLength } from "class-validator";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryColumn
} from "typeorm";
import { BookingsIndex, ListingType } from "./types";
import { User } from "./User";

registerEnumType(ListingType, {
    name: "ListingType"
});

@Entity("listings")
@Index(["country", "admin", "city"])
@ObjectType()
export class Listing extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn("text")
    id: string;

    @Field()
    @MaxLength(100)
    @Column("varchar", { length: 100 })
    title: string;

    @Field()
    @MaxLength(5000)
    @Column("varchar", { length: 5000 })
    description: string;

    @Field()
    @Column("text")
    image: string;

    @Field()
    @OneToOne(() => User)
    @JoinColumn()
    host: User;

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

    @Field(() => [String])
    @Column("simple-array")
    bookings: string[];

    @Field(() => String)
    @Column("simple-json")
    bookingsIndex: BookingsIndex;

    @Field()
    @Column("integer")
    price: number;

    @Field(() => Int)
    @Column("integer")
    numOfGuests: number;
}
