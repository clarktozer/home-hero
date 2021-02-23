import cookieParser from "cookie-parser";
import csrf from "csurf";
import { Express } from "express";

export const addCSRF = (app: Express) => {
    app.use(cookieParser());
    app.use(csrf());

    // app.use((req, res, next) => {
    //     if (!req.cookies.hhcsrf) {
    //         res.cookie("hhcsrf", req.csrfToken());
    //     }

    //     next();
    // });
};
