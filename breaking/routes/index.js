var express = require('express');
var router = express.Router();
var database = require('../db.js');

var mongoose = require('mongoose');
var Breaker = mongoose.model('Breaker');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/events', function(req,res,next){

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
  console.log("found breaker");
  res.render('breakersregistration');
});

router.post('/register/process-breaker',function(req,res,next){
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
    else{
      console.log("Error saving breaker");
    }
  });
});

router.get('/register/event', function(req,res,next){
  res.render('event-registration');
});

router.post('/register/process-event', function(req,res,next){
  console.log(req.body.date);
  var newEvent = Event({
    address: req.body.address,
    date: req.body.date,
    prizeMoney: parseInt(req.body.prizeMoney),
    format: req.body.format,
    details: req.body.details
  });
  newEvent.save(function(err,evt,count){
    if (err===null){
      res.redirect('/events');
    }
    else{
      console.log("Error processing event");
    }
  })
});

module.exports = router;
