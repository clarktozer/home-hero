declare namespace NodeJS {
    export interface ProcessEnv {
        PUBLIC_URL: string;
        NODE_ENV: "development" | "production";
        SESSION_SECRET: string;
        PORT: number;
        FACEBOOK_CLIENT_ID: string;
        FACEBOOK_CLIENT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
    }
}

declare namespace Express {
    interface User {
        id: string;
    }
}
