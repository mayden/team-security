var express = require('express');
var crypto = require('crypto-js');

// create our app
var router = express.Router();

var user_id = "";
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index',
        {
            title: 'Project Security'
        }
    );
});

/* login */
router.post('/login', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");


    var userObject = {
        "username": req.body.username,
        "password": req.body.password+ req.body.salt,
        "salt": req.body.salt,
        "urls": []
    };


    var db = req.db;
    var users = db.get('users');

    //have the user in the server
    users.findOne({
        "username": userObject.username
    },{"username":1, "password": 1, "salt":1,"urls":1}, function (err,result) {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // console.log(userObject.password);
            // if user exists so check if the password are match and send OK.
            if(result)
            {
                // same passwords?
                if(result.password === req.body.password + result.salt) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(result));
                }
                else
                {
                    res.status('500').send("Passwords don't match. Please try again.");
                }

            }
            // user not exists, so we need to add him to the DB
            else
            {
                users.insert(userObject);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(userObject));
            }
        }
    });
}); //end post login

/* login */
router.get('/login', function (req, res, next) {
    res.redirect('/');
});


/* Adding URL */
router.post('/addurl', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    var db = req.db;
    var users = db.get('users');

    var main_username = req.body.main_username;
    var site_url = req.body.site_url;
    var site_username = req.body.site_username;
    var site_password = req.body.site_password;

    users.update({"username": main_username},
    {
        $push: {
            "urls": {
                "site_url":      site_url,
                "site_username": site_username,
                "site_password": site_password
                }
        }
    }, function(err, doc){
        if(err){
            console.log("Something wrong when adding data!");
            res.status(500).send("Something wrong when adding data!");
        }
        else
        {
            res.send('OK');
        }

    });
});

/* Updating URL */
router.post('/updateurl', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    var db = req.db;
    var users = db.get('users');

    var main_username = req.body.main_username;
    var site_url = req.body.site_url;
    var site_username = req.body.site_username;
    var site_password = req.body.site_password;

    users.update({"username": main_username, "urls.site_url": site_url },
        {
            $set: {
                "urls.$.site_password": site_password,
                "urls.$.site_username": site_username
            }
        }, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
                res.status('500').send(err);
            }
            else
            {
                res.send('OK');
            }
        });
});


router.post('/geturls', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    var db = req.db;
    var users = db.get('users');

    var username = req.body.main_username;

    users.find({'username': username},function(err, result){
       if(err)
       {
           res.send(err);
       }
       else
       {
           res.setHeader('Content-Type', 'application/json');
           res.send(JSON.stringify(result.urls));
       }
    });

});

module.exports = router;