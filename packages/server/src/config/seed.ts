import { v4 } from "uuid";
import { Listing, User } from "../entity";
import { ListingType } from "../entity/Listing/types";

export const seed = async () => {
    const user = User.create({
        id: "12345",
        name: "James",
        avatar:
            "https://res.cloudinary.com/tiny-house/image/upload/w_1000,ar_1:1,c_fill,g_auto/v1560648533/mock/users/user-profile-1_mawp12.jpg",
        email: "james@tinyhouse.com",
        income: 723796,
        token: "1234"
    });

    await user.save();

    const listing1 = Listing.create({
        id: v4(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        description:
            "2 bed, 2 bathroom cozy apartment in the heart of downtown Toronto and only 5 min away from the CN Tower, Scotiabank Arena, and Rogers Center.",
        image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
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
        image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560641351/mock/Toronto/toronto-listing-2_aeg1rw.jpg",
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
