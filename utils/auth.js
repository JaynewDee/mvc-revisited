export const authorize = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/create");
  } else {
    next();
  }
};
