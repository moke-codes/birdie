const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {}
  })
);

app.use("/", routes);

module.exports = app;
