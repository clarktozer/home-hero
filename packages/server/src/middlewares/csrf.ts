import csrf from "csurf";
import { Express } from "express";

export const addCSRF = (app: Express) => {
    app.use(csrf());
};
