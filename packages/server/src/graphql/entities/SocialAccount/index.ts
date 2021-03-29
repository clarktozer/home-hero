import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { StrategyType } from "../../../auth";
import { BaseAccount } from "../BaseAccount";
import { User } from "../User";

@Entity()
@ObjectType()
@Unique("UQ_NAMES", ["id", "strategy"])
export class SocialAccount extends BaseAccount {
    @Field(() => ID)
    @PrimaryColumn("text")
    id: string;

    @Column("text")
    token: string;

    @Field(() => StrategyType)
    @Column({ type: "enum", enum: StrategyType })
    strategy: StrategyType;

    @Column("uuid")
    userId: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.socials)
    user: Promise<User>;
}
