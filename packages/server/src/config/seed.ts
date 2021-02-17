import { v4 } from "uuid";
import { Listing, User } from "../graphql/entities";
import { ListingType } from "../graphql/entities/Listing/types";

export const seed = async () => {
    const user = User.create({
        id: "12345",
        name: "James",
        avatar: "https://placedog.net/72/72?random",
        email: "james@example.com",
        income: 723796,
        token: "1234"
    });

    await user.save();

    const listing1 = Listing.create({
        id: v4(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        description:
            "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower, Scotiabank Arena, and Rogers Center.",
        image: "https://placedog.net/1200/768?random",
        type: ListingType.Apartment,
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
        type: ListingType.Apartment,
        address: "7009 Strawberry Street, Toronto, ON, CA",
        country: "Canada",
        admin: "Ontario",
        city: "Toronto",
        price: 15806,
        guests: 3
    });
    await listing2.save();

    user.listings = Promise.resolve([listing1, listing2]);
    await user.save();
};
