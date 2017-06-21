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
        "password": req.body.password,
        "salt": req.body.salt,
        "urls": {}
    };


    var db = req.db;
    var users = db.get('users');

    //have the user in the server
    users.findOne({
        "username": userObject.username
    }, function (err,result) {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            // if user exists so check if the password are match and send OK.
            if(result)
            {
                // same passwords?
                if(result.password == userObject.password) {
                    res.send("OK");
                    req.session.user_name =  req.body.username;
                    res.redirect('/my_secret_page');
                }
                else
                    res.send("Passwords don't match. Please try again.");
            }
            // user not exists, so we need to add him to the DB
            else
            {
                users.insert(userObject);
                res.send("First Time");
               // req.session.user_name =  req.body.username;
               // res.redirect('/my_secret_page');
            }
        }
    });
}); //end post login

/* login */
router.get('/login', function (req, res, next) {
    res.send('LOGIN GET EXAMPLE');
});

router.get('/my_secret_page', checkAuth, function (req, res) {
    res.send('if you are viewing this page it means you are logged in');
});

/* sendUrl */
router.post('/sendUrl', function (req, res, next) {
    console.log( req.body.url);
});

module.exports = router;

function checkAuth(req, res, next) {
    if (!req.session.user_name) {
        res.send('You are not authorized to view this page');
    }
}