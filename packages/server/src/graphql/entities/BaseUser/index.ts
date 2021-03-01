import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column } from "typeorm";

@ObjectType()
export class BaseAccount extends BaseEntity {
    @Field()
    @Column("text")
    name: string;

    @Field()
    @Column("text")
    avatar: string;

    @Field()
    @Column("text")
    email: string;
}
