import { Request } from "request";
import { Response } from "express-serve-static-core";
import ValidationError from "./middleware/errors";
import winston from 'winston';

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
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
const db = process.env.mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch ((err: string) => console.log(err));

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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {

    if (err instanceof ValidationError) {

        logger.error({ title: err.title, message: err.message, stack: err.stack });
        res.status(err.statusCode).json(err.message);   

    } else if (err.joi instanceof ValidationError) {
    
        logger.error({ title: err.joi.title, message: err.joi.message, stack: err.joi.stack });
        res.status(err.joi.statusCode).json(err.joi.message);   

    } else {

        console.log(err)
        logger.error({ message: err.message, stack: err.stack });
        res.status(500).json({ message: err.message || 'Unknown error' });
        
    }  
});

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));