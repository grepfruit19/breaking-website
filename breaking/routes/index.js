var express = require('express');
var router = express.Router();
var database = require('../db.js');

var mongoose = require('mongoose');
var Breaker = mongoose.model('Breaker');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/breakers', function(req,res,next){
  var filter = req.query.filter;
  //console.log(req.query.filter);
  if (req.query.filter===undefined){
    filter = {};
  }
  else{
    filter = {breakerName: filter};
  }
  //console.log(filter);
  Breaker.find(filter, function(err,breakerList,count){
    res.render('breakers', {breaker: breakerList});
  });
});

router.get('/register/breaker',function(req,res,next){
  res.render('breakersregistration');
});

router.post('/register/processBreaker',function(req,res,next){
  var newBreaker = Breaker({
    username: req.body.username,
    password: req.body.password,
    breakerName: req.body.breakerName,
    location: req.body.location,
    crew: req.body.crew
  });
  newBreaker.save(function(err,breaker,count){
    if (err===null){
      res.redirect('/breakers');
    }
  });
});

module.exports = router;
