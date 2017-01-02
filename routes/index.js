var express = require('express');
var router = express.Router();
var database = require('../db.js');

var passport = require('passport');

//Mongo stuff
var mongoose = require('mongoose');
var Breaker = mongoose.model('Breaker');
var Jam = mongoose.model('Jam');

router.get('/', function(req, res, next) {
  res.render('home', { title: 'New York Breaking League' });
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
