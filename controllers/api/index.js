import { Router } from "express";

const api = Router();

import user from "./user-routes.js";

api.use("/user", user);

export { api };
