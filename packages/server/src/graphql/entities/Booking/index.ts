import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Listing } from "../Listing";
import { User } from "../User";

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    created: Date;

    @Field()
    @CreateDateColumn({ type: "timestamptz" })
    updated: Date;

    @Column("uuid")
    listingId: string;

    @Field(() => Listing)
    @ManyToOne(() => Listing, listing => listing.bookings)
    listing: Promise<Listing>;

    @Column("uuid")
    tenantId: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.bookings)
    tenant: Promise<User>;

    @Field()
    @Column({ type: "timestamptz" })
    checkIn: Date;

    @Field()
    @Column({ type: "timestamptz" })
    checkOut: Date;
}
