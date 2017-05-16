var express = require('express');
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
  console.log(req.body.username.username);
    console.log(req.body.password);
    console.log(res.statusCode);
});

/* login */
router.get('/login', function(req, res, next) {
  res.send('LOGIN GET EXAMPLE');
  window.alert(req);

});

module.exports = router;
