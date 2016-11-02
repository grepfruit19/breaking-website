#Breaking Registration

##Vision

I'm a break dancer (known in the scene as a "bboy" or "breaker") and I've begun getting more involved with the community. As of late, there have been a few leagues pop up, where breakers can register and enter events (called "jams") using their registration as a persistant way to track what events they've been to, their number of wins. On the flip side, events can more easily track attendence, and look at past events for guidance. 

##Data Model

At minimum, there will be "Users" (Breakers), "Events" (Jams), and "Crews" (essentially breaking teams). I was toying with the idea of adding "move lists", but it seems unlikely for now.

```
//Users have a log in, but identifying information as well. Note that breakerName is not the same as username.
var User = new mongoose.Schema({
  //username and password provided by plugin
  breakerName: {type: String},
  crew: {type: String},
  location: {type: String},
  numberOfWins: {type: Number}
  //moveList: [{type: mongoose.Schema.Types.ObjectId, ref: 'MoveList'}] (Potentially)
});

//An event is basically a "competition", which has minimally the below information.
var Event = new mongoose.Schema({
  address: {type: String, required:true},
  eventDate: {type: String, required:true},
  prizeMoney: {type: Number, required:true}, //Can be zero
  judges: [User],
  participants: [User],
  format: {type: Number, required:true} //(indicates what the battle format will be, i.e., 2v2, 3v3, etc)
});

//A crew is a team of breakers that battle together. 
var Crew = new mongoose.Schema({
  members: [User],
  crewName: {type: String, required:true},
  Region: {type: String, required:true},
});
```

##Wireframes

/home
![Home Wireframe](/wireframes/home.png?raw=true "home")

/breakers (but Crews and Events will show a similar page)
![Breakers Wireframe](/wireframes/breakers.png?raw=true "Breakers")

/registration (for breakers, but registration for crews and events will show a similar page)
![Registration Wireframe](/wireframes/registration.png?raw=true "Registration")

##Sitemap

![Sitemap](/wireframes/sitemap.png?raw=true "Sitemap")

##User Stories

1. As a user I can register on this site, and use that registration to sign up for events
2. As a user I can search for other bboys by varying criteria, including region, number of wins, etc
3. As a user I can search for events by region, prize money, format, etc.
4. As a user I can easily search through both crews and breakers, because they are linked together.

##Research topics

* (6 points) User authentication using passport
  * This is a core functionality of this website, and will be very important
* (2 points) Bootstrap
  * This is a common technology being used, and would be very useful for me to learn. 
  * Additionally, I want my website to look gooood. 
* (4 points) Unit testing
  * A good habit to get into for software development in general
