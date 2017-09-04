
const express = require('express');
const routes = require('./routes');
const session = require('express-session');

const app = express();

app.use(session({ 
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: true,
    cookie: {}
 }));

app.use('/', routes);

module.exports = app;