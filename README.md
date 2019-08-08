<p align="center">
  <img src="https://i.imgur.com/YLGoIOk.png">
</p>

### Prerequisites

Visual Studio Code,
JavaScript,
React.js,
Node.js,
Express,
MongoDB
```
Visual Studio Code 1.36.1,
JavaScript,
React.js 6.9.0,
Node.js 10.16.0,
Express 4.17.1,
MongoDB 4.0.11
```

## Getting started

You can view a live demo over at

To get app running locally:
* Download or clone this project
* Open Visual Studio Code and integrated terminal
* Run script ```npm install``` to install dependencies
* Enter script ```cd client```
* Run script ```npm run dev``` to start the local server (backend running on port 5000 & frontend on 3000)

### Requests to the backend API

Live data is getting collected from Strava open API. Strava athletes upload millions of activities every day. Strava open API and this rich data set yield diverse opportunities for developers, from creating new hardware to augmenting the Strava experience.

Local backend server is running on http://localhost:5000/, with <b>endpoints</b>:

* ```/api/competitions```
* ```/api/users```
* ```/api/strava```
* ```/api/rounds```
* ```/api/leaderboard```

## Functionalities

* User login / registration with option of authorizing/deauthorizing Strava Account via OAuth 2.0
* Searching through data as competitions, segments and leaderboards
* CRUD Competitions
* CRUD Segments
* Receiving user data about Strava authorized users

## Built with

* [Visual Studio Code](https://code.visualstudio.com/) - Code editor
* [JavaScript](https://www.javascript.com/) - Programming language
* [React.js](https://reactjs.org/) - User interface library
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [MongoDB](https://www.mongodb.com/) - Database
* [Express](https://expressjs.com/) - Node.js framework


<p align="center">
  <img src="https://i.imgur.com/1aYsGX1.png">
</p>
