const https = require('https');
const express = require('express');
const router = express.Router();
const twitterController = require('./twitterController');

router.get('/', (req, res, next) => {
    res.send("Works!");
});

router.get('/login', twitterController.login);
router.get('/tweets', twitterController.tweets);

// router.get('/tweets', (req, res, next) => {
//     try {
//         console.log('req', req);
//         https.get({
//             hostname: 'api.twitter.com',
//             path: '/1.1/statuses/user_timeline.json?user_id=moke_rs&count=10',
//             agent: false  // create a new agent just for this one request

//         }, (res) => {
//             // Do stuff with response
//             let rawData = '';
//             res.on('data', (chunk) => rawData += chunk);
//             res.on('end', () => {
//               try {
//                 const parsedData = JSON.parse(rawData);
//                 console.log(parsedData);
//               } catch (e) {
//                 console.log(e.message);
//               }
//             });
//         });

//         res.send("Tweets!");
//     } catch (err) {
//         res.send(err);
//     }
// });

module.exports = router;