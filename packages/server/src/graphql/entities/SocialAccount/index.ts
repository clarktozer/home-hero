import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { StrategyType } from "../../../auth";
import { BaseAccount } from "../BaseUser";
import { User } from "../User";

registerEnumType(StrategyType, {
    name: "StrategyType"
});

@Entity("social_accounts")
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

    @Field(() => User)
    @ManyToOne(() => User, user => user.socials)
    user: Promise<User>;
}
