var express = require('express');
// var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClient;
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
        "salt": Math.random().toString(36).substring(5)
    };

    var db = req.db;
    var users = db.get('users');
    //have the user in the server
    users.findOne({
        "username": req.body.username,
        "password": req.body.password
    }).then(function (result) {
        console.log(result); //normalReturn
        if (result === {} || result === null || result === undefined) {
            users.insert(userObject, function (err, doc) {
                if (err) {
                    res.send("There was a problem adding the information to the database.");
                }

            });
        }
        res.send('Successfully register to our DB.');
        console.log('Successfully register to our DB.');
        users.findOne({
            "username": req.body.username,
            "password": req.body.password
        }).then(function (result) {
            console.log(result); //normalReturn
            user_id = result._id;
            console.log(user_id);
        });
    });
}); //end post login

/* login */
router.get('/login', function (req, res, next) {
    res.send('LOGIN GET EXAMPLE');
});

module.exports = router;
