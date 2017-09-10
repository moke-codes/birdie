const https = require("https");
const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const twitterController = require("./controllers/twitterController");

// Verify whether user is authenticated
router.use((req, res, next) => {
  if (
    req.session.UserInfo ||
    req.url.startsWith("/login") ||
    req.url.startsWith("/auth")
  ) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.post("/auth", userController.authenticate);

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});
router.get("/tweets", twitterController.tweets);

module.exports = router;
