import { Router } from "express";

const main = Router();

import { api } from "./api/index.js";
import home from "./home-routes.js";

main.use("/", home);
main.use("/api", api);

export default main;
