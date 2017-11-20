var express = require('express');
var router = express.Router();

var puppyList = require('../puppyList.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(JSON.stringify(puppyList, null, 4));
  res.render('index', {
      title: 'launch',
      doglist: puppyList // pass data to front
  });
});

module.exports = router;
