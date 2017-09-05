const https = require('https');
const express = require('express');
const router = express.Router();
const twitterController = require('./twitterController');

router.get('/', (req, res, next) => {
    res.render("index");
});

router.get('/login', twitterController.login);
router.get('/tweets', twitterController.tweets);

module.exports = router;