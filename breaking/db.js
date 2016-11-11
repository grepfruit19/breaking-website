var mongoose = require('mongoose')
// URLSlugs = require('mongoose-url-slugs');

var Breaker = new mongoose.Schema({
  username: String,
  password: String,
  breakerName: String,
  location: String,
  crew: String
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

mongoose.connect(dbconf);

module.exports = {
  Breaker: Breaker,
}
