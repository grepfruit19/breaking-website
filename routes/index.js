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

router.get('/reqs', function(req,res,next){
  var type = req.query.process;
  var array = req.query.list;
  if (array!==undefined && type!==undefined){
    array = array.split(',');
    var modArray = [];
    if (type==='double'){
      modArray = array.map(function(element){
        return element*2;
      });
    } else if (type==='remove'){
      modArray = array.filter(function(element){
        if (element>20){ return element; }
      });
    } else if (type==='lowest'){
      var lowest = push.array.reduce(function(a,b){
        return Math.min(a,b);
      });
      modArray[0] = lowest;
    }
    res.render('reqs', {number: modArray});
  }
  else{
    res.render('reqs');
  }
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
    if (req.user!==undefined && req.user.username===breaker.username){
      console.log("Okay");
      res.render('breaker-page', {breaker: breaker, currentUser: true});
    }
    else{
      console.log("Nokay");
      res.render('breaker-page', {breaker: breaker, currentUser:false});
    }
  });
});

router.get('/breakers/:slug/edit', function(req,res,next){
  var slug = req.params.slug;
  Breaker.findOne({slug: slug}, function(err,breaker,count){
    if (req.user!==undefined && req.user.username===breaker.username){
      res.render('breaker-edit', breaker);
    }
    else{
      res.render('error', {message: "You don't have permission for this"});
    }
  });
});

router.post('/breakers/:slug/edit-submit', function(req,res,next){
  var slug = req.params.slug;
  var updateParams = {
    breakerName: req.body.breakerName,
    location: req.body.location,
    bio: req.body.bio
  }
  Breaker.update({slug: slug}, updateParams, function(err,breaker){
    res.redirect('/breakers/' + slug);
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
      console.log(err);
      console.log("Error processing event");
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
