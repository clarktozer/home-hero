import cors, { CorsOptions } from "cors";
import { Express } from "express";

export const addCors = (app: Express) => {
    const corsOptions: CorsOptions = {
        origin: process.env.CLIENT_URL
    };

    app.use(cors(corsOptions));
};
