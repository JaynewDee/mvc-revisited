import { Router } from "express";
import { authorize } from "../utils/auth.js";

const home = Router();

home.get("/", authorize, async (req, res) => {
  const session = req.session ? req.session : { status: "unauthorized" };
  try {
    res.render("home", { session });
  } catch (err) {
    res.status(500).json(err);
  }
});

home.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

home.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

export default home;
