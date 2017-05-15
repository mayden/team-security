var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      { title: 'Express' });
});

/* login */
router.post('/login', function(req, res, next) {
  res.send('checking something');
});

/* login */
router.get('/login', function(req, res, next) {
  res.send('LOGIN GET EXAMPLE');
});

module.exports = router;
