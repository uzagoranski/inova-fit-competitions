const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");

const users = require("./routes/api/users");
const competitions = require("./routes/api/competitions");
const rounds = require("./routes/api/rounds");
const strava = require("./routes/api/strava");
const stats = require("./routes/api/stats");
const leaderboard = require("./routes/api/leaderboard");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/competitions", competitions);
app.use("/api/rounds", rounds);
app.use("/api/strava", strava);
app.use("/api/stats", stats);
app.use("/api/leaderboard", leaderboard);

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));