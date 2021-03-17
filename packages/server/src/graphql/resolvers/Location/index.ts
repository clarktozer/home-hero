import { PlaceAutocompleteType } from "@googlemaps/google-maps-services-js";
import { Arg, Query } from "type-graphql";
import { Google } from "../../../api";
import { Prediction } from "./types";

export class LocationResolver {
    @Query(() => [Prediction])
    async autocomplete(@Arg("input") input: string): Promise<Prediction[]> {
        const data = await Google.autocomplete(
            input,
            PlaceAutocompleteType.cities
        );

        return data.predictions.map(prediction => ({
            id: prediction.place_id,
            title: prediction.structured_formatting.main_text,
            subtitle: prediction.structured_formatting.secondary_text
        }));
    }
}
