import "express-session";

declare module "express-session" {
    interface SessionData {
        redirectTo?: string;
        csrfSecret: string;
    }
}
