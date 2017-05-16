var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Express' });
});

/* login */
router.post('/login', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    res.send('Successfully connected  to the server.');
    console.log(req.body);
    console.log(res.statusCode);
     MongoClient.connect("mongodb://manager:1234@ds139801.mlab.com:39801/heroku_5277wf1z", function(err, db) {
       if (!err) {
           console.log("We are connected");
        }
      });
});

    /* login */
    router.get('/login', function (req, res, next) {
        res.send('LOGIN GET EXAMPLE');
        window.alert(req);

    });

    module.exports = router;
