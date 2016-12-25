#Breaking Registration

##Vision

I'm a break dancer (known in the scene as a "bboy" or "breaker") and I've begun getting more involved with the community. As of late, there have been a few leagues pop up (most notably "UDEF"), where breakers can register and enter events (called "jams" within the community). However, their site is essentially exclusively for event registration and sign ups, and I felt that there could be much more. 

I saw potential value in using this website to track breakers, what events they've been to, their number of wins, etc. If enough breakers used this website, it could also become a sort of leaderboard or ladder common in many eSports for example (another passion of mine). 

On the flip side, events can more easily track attendence, and look at past events for guidance. 

##Data Model

At minimum, there will be "Users" (Breakers), "Events" (Jams), and "Crews" (essentially breaking teams).

```
//Users have a log in, but identifying information as well. Note that breakerName is not the same as username.
var User = new mongoose.Schema({
  //username and password provided by plugin
  breakerName: {type: String},
  crew: [Crew], //one can be in more than one crew
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
  admin: [User],
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
4. As a user I can easily see which breakers are in which crews (and vice versa)
5. As a user I can register a new event. 
6. As a user I can register my crew and have my crewmates join them. 
