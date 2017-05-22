var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
// create our app
var router = express.Router();

// instruct the app to use the `bodyParser()` middleware for all routes
//router.use(bodyParser());
//router.use(bodyParser.toString()); // support json encoded bodies

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

    res.send('Successfully connected  to the server.');

    var username = req.body.username; // username from client
    var password = req.body.password; // password from client

     MongoClient.connect("mongodb://manager:1234@ds139801.mlab.com:39801/heroku_5277wf1z", function(err, db) {
         if (!err) {
             console.log("We are connected to MongoDB");
/*             db.users.insert({
                 "username": "a",
                 "password": "e",
                 "salt": "fww"

             });//end MongoBD*/
         }
     });//end connection
}); //end post login

    /* login */
    router.get('/login', function (req, res, next) {
        res.send('LOGIN GET EXAMPLE');
    });

    module.exports = router;
