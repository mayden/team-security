var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
// create our app
//var router = express.Router();
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Express' });
});

/* login */
app.post('/login', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    res.send('Successfully connected  to the server.');
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body[username]);
    console.log(req.username);
    console.log(res.statusCode);
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
        window.alert(req);

    });

    module.exports = router;
