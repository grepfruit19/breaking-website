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
      res.render('breaker-page', {breaker: breaker, currentUser: true});
    }
    else{
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
