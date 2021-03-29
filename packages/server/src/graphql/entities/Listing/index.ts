import { Field, ID, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId
} from "typeorm";
import { Booking } from "../Booking";
import { User } from "../User";
import { ListingType } from "./types";

@Entity()
@Index(["country", "admin", "city"])
@ObjectType()
export class Listing extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    created: Date;

    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    updated: Date;

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
    @Column("float")
    lat: number;

    @Field()
    @Column("float")
    lng: number;

    @Field(() => Int)
    @Column("integer")
    price: number;

    @Field(() => Int)
    @Column("integer")
    guests: number;

    @Field(() => Int)
    @Column("integer")
    minStay: number;

    @Field(() => Int)
    @Column("integer")
    maxStay: number;

    @ManyToMany(() => User, user => user.favorites)
    @JoinTable()
    favoritedBy: Promise<User[]>;

    @Column("uuid")
    hostId: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.listings)
    host: Promise<User>;

    @RelationId((listing: Listing) => listing.bookings)
    bookingIds: string[];

    @OneToMany(() => Booking, booking => booking.listing)
    bookings: Promise<Booking[]>;

    authorized?: boolean;
}
