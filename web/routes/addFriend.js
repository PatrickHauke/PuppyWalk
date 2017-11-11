var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addFriend', { title: 'Add a friend for your pupper' });
});

module.exports = router;
