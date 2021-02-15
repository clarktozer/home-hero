declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production";
        SESSION_SECRET: string;
        PORT: number;
        FACEBOOK_CLIENT_ID: string;
        FACEBOOK_CLIENT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
    }
}
