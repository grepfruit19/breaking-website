//Questions: How to handle registration
//Handling logout without leaving page?

var express = require('express');
var router = express.Router();
var database = require('../db.js');

var passport = require('passport');

//Mongo stuff
var mongoose = require('mongoose');
var Breaker = mongoose.model('Breaker');
var Jam = mongoose.model('Jam');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/events', function(req,res,next){
  var filter = req.query.filter;
  //console.log(req.query.filter);
  if (req.query.filter===undefined){
    filter = {};
  }
  else{
    filter = {name: filter};
  }
  //console.log(filter);
  Jam.find(filter, function(err,jamList,count){
    res.render('events', {jam: jamList});
  });
  res.render('events');
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

router.get('/breakers/:slug', function(req,res,next){
  var slug = req.params.slug;
  Breaker.findOne({slug: slug}, function(err,breaker,count){
    console.log(breaker);
    var breakerName = breaker.breakerName;
    res.render('breaker-page', breaker);
  });
});

router.get('/register/breaker',function(req,res,next){
  console.log("found breaker");
  res.render('breakersregistration');
});

router.post('/register/process-breaker',function(req,res,next){
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
        console.log("Error registering user");
      } else {
        passport.authenticate('local')(req,res,function(){
          res.redirect('/breakers');
        });
      }
    });
});

router.get('/register/event', function(req,res,next){
  res.render('event-registration');
});

router.post('/register/process-event', function(req,res,next){
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
      console.log("Error processing event");
      return handleError(err);
    }
  });
});

router.get('/login', function(req,res,next){
  res.render('login');
});

router.post('/login', function(req,res,next){
  passport.authenticate('local', function(err,user){
    if(user) {
      req.logIn(user, function(err){
        res.redirect('/breakers');
      });
    }else{
      //Render an error page
      console.log("Error at login");
    }
  })(req,res,next);
});

router.get('/logout', function(req,res,next){
  req.logout();
  res.redirect('/');
});

module.exports = router;
