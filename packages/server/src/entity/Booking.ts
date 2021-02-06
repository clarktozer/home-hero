import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("bookings")
@ObjectType()
export class Booking extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn("text")
    id: string;

    @Field()
    @Column("text")
    listing: string;

    @Field()
    @Column("text")
    tenant: string;

    @Field()
    @Column("text")
    checkIn: string;

    @Field()
    @Column("text")
    checkOut: string;
}
