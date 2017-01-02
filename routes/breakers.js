var express = require('express');
var router = express.Router();
var database = require('../db.js');

var passport = require('passport');

//Mongo stuff
var mongoose = require('mongoose');
var Breaker = mongoose.model('Breaker');
var Jam = mongoose.model('Jam');

router.get('/', function(req,res,next){
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

router.get('/:slug', function(req,res,next){
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

router.get('/:slug/edit', function(req,res,next){
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

router.post('/:slug/edit-submit', function(req,res,next){
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

module.exports = router;
