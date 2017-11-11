var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addDog', { title: 'Add a dog to Puppy Walk' });
});

module.exports = router;
