var TwitterAPI = require('node-twitter-api');

var twitter = new TwitterAPI({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callback: process.env.TWITTER_CALLBACK_ADDRESS
});

exports.login = (req, res, next) => {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            //store token and tokenSecret somewhere, you'll need them later; redirect user 
            console.log("Tokens", requestToken, requestTokenSecret);
            req.session.requestToken = requestToken;
            req.session.requestTokenSecret = requestTokenSecret;

            res.redirect(`https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`);
        }
    });
}

exports.tweets = (req, res, next) => {

    console.log(req.session.requestToken, req.session.requestTokenSecret);
    console.log(req.query["oauth_verifier"]);

    const oauthVerifier = req.query["oauth_verifier"];

    if (!req.session.accessToken) {
        twitter.getAccessToken(req.session.requestToken, req.session.requestTokenSecret, oauthVerifier, 
            (error, accessToken, accessTokenSecret, results)  => {
            if (error) {
                console.log(error);
                res.send(`Error: ${error}`);
            } else {
                //store accessToken and accessTokenSecret somewhere (associated to the user) 
                //Step 4: Verify Credentials belongs here 
                console.log("Access tokens", accessToken, accessTokenSecret);
                req.session.accessToken = accessToken;
                req.session.accessTokenSecret = accessTokenSecret;
            }
        });
    }

    try {
        twitter.lists(
            "ownerships", 
            { screen_name: "moke_rs" },
            req.session.accessToken,
            req.session.accessTokenSecret,
            (error, data, response) => {
                if (error) {
                    console.log(error);
                    res.send(`Error: ${error}`);
                } else {
                    console.log(data);
                    res.send(data);
                }
            }
        );
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
}