import path from "path";
import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import MemoryStore from "memorystore";
import chalk from "chalk";
import { sequelize } from "./config/connection.js";
import controllers from "./controllers/index.js";
import {} from "dotenv/config";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 7777;

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const Store = MemoryStore(session);

app.use(
  session({
    saveUninitialized: false,
    secret: process.env.SESSION_KEY,
    store: new Store({
      checkPeriod: 86400000
    }),
    resave: false,
    cookie: { maxAge: 86400000 }
  })
);

app.use(controllers);

app.listen(PORT, () => {
  console.log(chalk.green(`SERVER LISTENING @ PORT ${PORT}`));
  sequelize.sync({ force: false });
});
