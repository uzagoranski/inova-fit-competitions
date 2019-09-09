// Dependencies
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";
import ValidationError from "./middleware/errors";
import winston from 'winston';
import users from "./routes/api/users";
import competitions from "./routes/api/competitions";
import rounds from "./routes/api/rounds";
import strava from "./routes/api/strava";
import stats from "./routes/api/stats";
import leaderboard from "./routes/api/leaderboard";

require('dotenv').config();

const app = express();

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

    app.get('*', (req: any, res: any) => {
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
app.use((err: any, req: any, res: any, next: Function) => {

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