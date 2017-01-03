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
    filter = {name: filter};
  }
  //console.log(filter);
  Jam.find(filter, function(err,jamList,count){
    res.render('events', {jam: jamList});
  });
});

router.get('/:slug', function(req,res,next){
  var slug = req.params.slug;
  Jam.findOne({slug: slug}, function(err,jam,count){
    var admins = jam.admins;
    console.log(admins);
    var isAdmin=false;
    if (req.user!==undefined){
      admins.forEach(function(element){
        if (element===req.user){ isAdmin=true; }
      });
    }
    console.log(isAdmin);
    res.render('event-page', {jam: jam, isAdmin: isAdmin});
  });
});

module.exports = router;
