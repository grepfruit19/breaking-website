var mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Breaker = mongoose.model('Breaker');

passport.use(new LocalStrategy(Breaker.authenticate()));

passport.serializeUser(Breaker.serializeUser());
passport.deserializeUser(Breaker.deserializeUser());
