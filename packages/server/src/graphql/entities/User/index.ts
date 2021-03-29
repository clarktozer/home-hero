import { Field, ID, Int, ObjectType } from "type-graphql";
import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import { BaseAccount } from "../BaseAccount";
import { Booking } from "../Booking";
import { Listing } from "../Listing";
import { SocialAccount } from "../SocialAccount";

@Entity()
@ObjectType()
@Unique(["email"])
export class User extends BaseAccount {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => Int, { nullable: true })
    @Column("integer", { default: 0 })
    income: number;

    @Column("text", { nullable: true })
    walletId?: string;

    @OneToMany(() => Booking, booking => booking.tenant)
    bookings: Promise<Booking[]>;

    @OneToMany(() => Listing, listing => listing.host)
    listings: Promise<Listing[]>;

    @OneToMany(() => SocialAccount, account => account.user)
    socials: Promise<SocialAccount[]>;

    @ManyToMany(() => Listing, listing => listing.favoritedBy)
    favorites: Promise<Listing[]>;

    @Field(() => Boolean, { nullable: true })
    @Column("bool", { default: false })
    confirmed: boolean;

    authorized?: boolean;

    @Field(() => Boolean)
    hasWallet() {
        return Boolean(this.walletId);
    }
}
