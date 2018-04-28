module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not Authorized");
    res.redirect("/");
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect("/staff/dashboard");
    } else {
      return next();
    }
  }
};
