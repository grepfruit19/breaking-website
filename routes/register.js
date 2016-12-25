var express = require('express');
var router = express.Router();

var database = require('../db.js');
var passport = require('passport');

//Mongo stuff
var mongoose = require('mongoose');
var Breaker = mongoose.model('Breaker');
var Jam = mongoose.model('Jam');

router.get('/breaker',function(req,res,next){
  res.render('breakersregistration');
});

router.post('/process-breaker',function(req,res,next){
  var newBreaker = Breaker({
    username: req.body.username,
    breakerName: req.body.breakerName,
    location: req.body.location,
    crew: req.body.crew,
    bio: req.body.crew
  });
  Breaker.register(newBreaker,
    req.body.password, function(err,user){
      if (err){
        //render some sort of error page
        console.log("Error registering user", err);
        res.redirect('/breakers');
      } else {
        passport.authenticate('local')(req,res,function(){
          res.redirect('/breakers');
        });
      }
    });
});

router.get('/event', function(req,res,next){
  res.render('event-registration');
});

router.post('/process-event', function(req,res,next){
    var newEvent = Jam({
    name: req.body.name,
    address: req.body.address,
    eventDate: req.body.date,
    prizeMoney: req.body.prizeMoney,
    format: req.body.format,
    details: req.body.details
  });
  console.log("hello", newEvent);
  newEvent.save(function(err,evt,count){
    if (err===null){
      console.log("Saved event");
      res.redirect('/events');
    }
    else{
      console.log(err);
      console.log("Error processing event");
    }
  });
});

module.exports=router;
