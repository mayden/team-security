var express = require('express');
// var bodyParser = require('body-parser');
// var MongoClient = require('mongodb').MongoClient;
// create our app
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {
          title: 'Project Security'
      }
  );
});

/* login */
router.post('/login', function(req, res, next) {
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
    users.find({ "username": req.body.username,
        "password": req.body.password}).then(function(result) {
        console.log(result); //normalReturn
        if (result === {}||result === undefined)
        {
            users.insert(userObject, function (err, doc) {
                if (err) {
                    res.send("There was a problem adding the information to the database.");

                }
                else {
                    res.send('Successfully register to our DB.');
                    console.log('Successfully register to our DB.');
                    next();

                }
            });
        }
        else {
            res.send('Successfully register to our DB.');
            console.log('Successfully register to our DB.');
            next();
        }
    });



}, function (req, res, next) {
    console.log('test1');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    console.log('test2');
    var userObject = {
        "username": req.body.username,
        "password": req.body.password,
        "salt": Math.random().toString(36).substring(5)
    };

    //save user id in server
    var db = req.db;
    var users = db.get('users');
    var userId = users.findOne().then(function(result) {
        console.log(result); //normalReturn
        console.log(result._id); //normalReturn
    });
    //res.send(userId);
    console.log(userId);
    var id = userId._id;
    console.log(id);
   // res.send(id);
    // res.send(userId);

}); //end post login

    /* login */
    router.get('/login', function (req, res, next) {
        res.send('LOGIN GET EXAMPLE');
    });

    module.exports = router;
