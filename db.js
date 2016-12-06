var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var URLSlugs = require('mongoose-url-slugs');

var Breaker = new mongoose.Schema({
  breakerName: String,
  location: String,
  crew: String,
  bio: String
});
Breaker.plugin(URLSlugs('breakerName crew'));
Breaker.plugin(passportLocalMongoose);

var Jam = new mongoose.Schema({
  name: String,
  address: String,
  eventDate: String,
  prizeMoney: String,
  judges: [Breaker],
  participants: [Breaker],
  format: String,
  details: String
});
Jam.plugin(URLSlugs('name eventDate'));

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
mongoose.model('Jam', Jam);

mongoose.connect(dbconf);

module.exports = {
  Breaker: Breaker,
  Jam: Jam,
}
