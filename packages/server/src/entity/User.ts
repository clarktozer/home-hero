import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

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

    @Field({ nullable: true })
    @Column("text", { nullable: true })
    walletId?: string | null;

    @Field()
    @Column("integer")
    income: number;

    @Field(() => [String])
    @Column("simple-array")
    bookings: string[];

    @Field(() => [String])
    @Column("simple-array")
    listings: string[];
}
