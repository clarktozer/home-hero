import { useMount } from "react-use";
import { useScript } from "../useScript";
import { GoogleApiProps } from "./types";

export const useGoogleApiScript = ({ key, onLoad }: GoogleApiProps) => {
    useMount(() => {
        (window as any).init = () => {
            onLoad && onLoad();

            delete (window as any).init;
        };
    });

    const status = useScript(
        `https://maps.googleapis.com/maps/api/js?key=${key}&callback=init`
    );

    return status;
};
