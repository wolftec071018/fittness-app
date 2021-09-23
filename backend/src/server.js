// express module
const express = require("express");
// environment variables
//const { port, socketPort } = require('./config/auth.config');

// installed with express used for getting body data
const bodyParser = require('body-parser');

// cross origin library to allow communication between react and express
const cors = require('cors');

// Socket io for messaging
const socket = require("socket.io");

// database models
const { db } = require('./models');
const { initial } = require("./utils/initial.util");

// start the app
const app = express();

global.__basedir = __dirname;

// sets the Cors library
app.use(cors());
// parses request of type application/json
app.use(bodyParser.json());
// parse request of type application/x-www-form
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);  // login, signup
require('./routes/athlete.routes')(app);  // athlete view
require('./routes/trainer.routes')(app);  // trainer routes
require('./routes/admin.routes')(app);  // admin routes
require('./routes/workout.routes')(app);  // workouts
require('./routes/exercise.routes')(app);  // exercises
require('./routes/email-invite.routes')(app);  // email invite
require('./routes/user.routes')(app);  // user info
require('./routes/update.routes')(app);  // update profile, address, goals
require('./routes/body-part.routes')(app);  // body part routes
require('./routes/measurements.routes')(app);  // measurements
require('./routes/search.routes')(app);  // search routes
require('./routes/predefined.routes')(app);  // predefined workouts

const port = 5000;
const socketPort = 5200;

/* Socket server */
const server = app.listen(socketPort, () => {
    console.log('******************************')
    console.log(`Messaging socket running on ${socketPort}`)
    console.log('******************************')
});

io = socket(server, {
  cors: {
    origin: "http://localhost:3000", //Change this to origin of the react
    methods: ["GET", "POST"]
  }
});
const socketManager = require('./routes/socket.routes')(io);
io.on("connection", socketManager); //Socket on

/* Main App server */
app.listen(port, () => {
    console.log('******************************')
    console.log(`Server running on port ${port}`)
    console.log('******************************')
});


// initialize and authenticate the db user
db.sequelize
    .authenticate()
    .then(() => {
        console.log('**********************')
        console.log('Connection established');
        console.log('**********************')
    })
    .catch(err => {
        console.log('Unable to connect:', err);
    });

// sync user with db and initialize roles
db.sequelize.sync({ force: true }).then(() => {
    console.log('*************************')
    console.log('Database & tables created');
    console.log('*************************')

    initial.setUsers();
    initial.setPredefinedWorkouts();
});


// home route
app.get("/", function (req, res) {
   res.status(200).json({ message: "Welcome to Fitness-tracker's home page"});
});
