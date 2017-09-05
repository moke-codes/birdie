
const express = require('express');
const routes = require('./routes');
const session = require('express-session');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

app.use(session({ 
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true,
    cookie: {}
 }));

app.use('/', routes);

module.exports = app;