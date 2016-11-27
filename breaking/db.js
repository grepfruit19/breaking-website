var mongoose = require('mongoose')
// URLSlugs = require('mongoose-url-slugs');

var Breaker = new mongoose.Schema({
  username: String,
  password: String,
  breakerName: String,
  location: String,
  crew: String
});

var Event = new mongoose.Schema({
  address: {type: String, required:true},
  eventDate: {type: String, required:true},
  prizeMoney: {type: Number, required:true},
  judges: [Breaker],
  participants: [Breaker],
  format: {type: String, required:true},
  details: String
});

// is the environment variable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV == 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/breaking';
}

mongoose.model('Breaker', Breaker);
mongoose.model('Event', Event);

mongoose.connect(dbconf);

module.exports = {
  Breaker: Breaker,
  Event: Event,
}
