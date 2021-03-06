import { v4 } from "uuid";
import { Listing, User } from "../graphql/entities";
import { ListingType } from "../graphql/entities/Listing/types";
import { SocialAccount } from "../graphql/entities/SocialAccount";

export const seed = async () => {
    const social = SocialAccount.create({
        id: "12345",
        name: "James",
        avatar: "https://placedog.net/72/72?random",
        email: "james@example.com",
        token: "1234"
    });

    const user = User.create({
        income: 723796,
        socials: Promise.resolve([social])
    });

    await user.save();

    const listing1 = Listing.create({
        id: v4(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        description:
            "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower, Scotiabank Arena, and Rogers Center.",
        image: "https://placedog.net/1200/768?random",
        type: ListingType.APARTMENT,
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        country: "Canada",
        admin: "Ontario",
        city: "Toronto",
        price: 12424,
        guests: 3
    });
    await listing1.save();

    const listing2 = Listing.create({
        id: v4(),
        title: "Cozy, clean, and affordable studio in midtown",
        description:
            "Cozy, clean, and affordable studio located around midtown. Perfect for a solo traveller on a budget.",
        image: "https://placedog.net/1200/768?random",
        type: ListingType.APARTMENT,
        address: "7009 Strawberry Street, Toronto, ON, CA",
        country: "Canada",
        admin: "Ontario",
        city: "Toronto",
        price: 15806,
        guests: 3
    });
    await listing2.save();

    const listing3 = Listing.create({
        id: v4(),
        title: "Example text",
        description:
            "Cozy, clean, and affordable studio located around midtown. Perfect for a solo traveller on a budget.",
        image: "https://placedog.net/1200/768?random",
        type: ListingType.APARTMENT,
        address: "7009 Strawberry Street, Toronto, ON, CA",
        country: "Canada",
        admin: "Ontario",
        city: "Toronto",
        price: 15806,
        guests: 3
    });
    await listing3.save();

    user.listings = Promise.resolve([listing1, listing2]);
    await user.save();
};
