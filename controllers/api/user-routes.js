import { Router } from "express";
import { User } from "../../models/User.js";

const user = Router();

user.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

user.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

user.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      console.log(`DESTROOOOOOOY!!! =)`);
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

export default user;
