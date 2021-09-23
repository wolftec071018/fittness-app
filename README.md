# Fitness Tracker App

**About**
- A platform where personal fitness trainers can create and assign their clients workout programs. 
  Once a client is assigned a program they can input their progress, and the personal fitness 
  trainer can manage and track their progress.
  
- The MVP will start with a limited number of popular workout routines.
  
- Trainers spend hours coming up with spreadsheet programs, updating them based on their client's progress, 
  and providing them feedback. 
  
  This platform will automate the process and make it easier for them to manage their clients. 
  Trainers will pay a monthly fee based on the # of clients they have.
  
- Trainers will have a complete admin dashboard where they can send email invites to their clients to 
  create an account, manage all of their client's workout programs, and other features.
  
- Clients are also able to create their own workout programs to track their own progress without the need for 
  a personal fitness trainer.
  
  These regular users should also be able to input past workouts into the system.
  
- Clients should see be able to view their weekly workout plan and update how much of the workout 
  they've completed as well as see a chart of their progress for each workout. 
  
  For example, if the workout plan contains a bench press then the user should 
  be able to select bench press track how much they've progressed over time.
  
- Clients should be able to export their workouts into a spreadsheet.
  
- Clients should also be able to message their personal fitness trainer.
  
- Clients will have a customer support section where users can request new features or provide feedback.
  
- Clients will also have an explore tab where they can search for a personal fitness trainer to hire. 
  
  Eventually this will be expanded to include other services nutritionists and meal planner.
  
- Eventually users will be able to track their goals, macros, measurements, and meals.

# Build Instructions

**prerequisites**
For the project, you will need to set up the PostgreSQL database. To do so:
Download and install PostgreSQL. (https://www.postgresql.org/download/)
Create a new database named ‘fitness’
Create a new postgres user
username: ‘fitness_admin’ 
password: ‘2021-fitness-tracker’
Note: If you desire to use your custom username and password, change the values    inside of ‘./backend/src/config/auth.js’
Start the database

To start the project, you can:
Option 1 - Installation with Docker: 
Download Docker (https://www.docker.com/get-started)
Download docker image file
Navigate to docker image location in your computer
$ docker build . -t <your username>/fitness-web-app
$ docker images
# Example
REPOSITORY                      		TAG        	ID              		CREATED
node                            		14         	1934b0b038d1    	5 days ago
<your username>/fitness-web-app    latest    	 d64d3505b0d2    	1 minute ago
$ docker run -p 49160:8080 -d <your username>/fitness-web-app

Option 2 - Installation with terminal/CLI:
Open terminal/CLI
Navigate to desire project location
$ mkdir fitness_app && cd fitness_app
$ git clone <github repo>
To start the backend, open a terminal and:
$ cd backend/src
$ npm install
$ node server.js
To start the frontend, open an additional terminal and:
$ cd frontend/src
$ npm install
$ npm run start

Note: 
Fixing Socket.io:
This should not be an issue, but in case, if the React port # is anything other than 3000, there will be a connection error for messaging. To fix that, in the backend terminal, type cd backend/src/server.js. Then, change the port number to the current port in the cors setting for Socket.io in the “io” variable.

Setup Cloudinary:
Register for Cloudinary (https://cloudinary.com/)
Obtain the cloud_name, api_key, api_secret
Add it to <path/to/code>/backend/src/config/cloudinary.config.js
Create an ‘uploads’ folder in project location

Setup Google Maps API:
Register for Google Engine (https://cloud.google.com/appengine)  
Get the key for google maps geocoder
Add it to <path/to/code>/backend/src/config/google-geocoder.config.js

Setup Stripe:
Register for Stripe (https://dashboard.stripe.com/register)
Get the stripe api key
Add it to <path/to/code>/backend/src/config/stripe.config.js
