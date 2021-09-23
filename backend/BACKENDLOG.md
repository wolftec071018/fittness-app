# Backend Log

Authors: Bharath Gajjala, Mark Codd

**20-Feb-2021:**

- Created backend folder for project.
- Updated comments and paths.
- Made new superuser and password for fitness database.

**21-Feb-2021:**
- Update documentation for the routes with the required params.

**22-Feb-2021:**
- Updated comments.
- Created clients database.
- Added functionality for the workout and exercise controllers.
- Added error catchers.

**23-Feb-2021:**
- Updated models of profile, address, and goals to display the userId as the primaryKey.
- Created validators for state and zipcode for Address route.
- Created validators for weight and height for Goal route.

**24-Feb-2021:**
- Util email function revised and tested.
- Updated email invite controller.
- Renamed client model to athlete model.
- Removed invitation model and moved variables to athlete model.

**25-Feb-2021:**
- Added Password check middleware -> Verify update
- Verify Current Password before updating
- Verify Password before email update
- Email update and password update  

**1 March-2021:**
- Adding param checking
- Working on more efficient way

**7-March-2021:**
- Added moment npm package
- Created validator for DOB
- Added validator to middleware and routes
- Modify signup to return id and access token

**8-March-2021:**
- Updated goalTYpe to be a part of Goals
- Delete Objectives model

**9-March-2021:**
- Updated models with new references and primary keys
- Created isOwner middleware to allow only the requested user, or the user's trainer to have access to their data
- Created workout routes for the trainer's athletes
- Created trainer controllers

**10-March-2021:**
- Allowed athletes and trainers to CRUD workouts and exercises
- Updated security for all endpoints
- Added restPeriod to workout models

**06-April-2021:**
- Updated auth controller to have variables at beginning of function
- Created search trainer and search athlete based on city
- TODO: implement google maps
- Updated profile model to accept image
- Updated user model to accept a boolean for public access
- Created a view profile function to view a specific user

**06-April-2021:**
- Added socket Connection
- Updated model for holding socket connections
- TODO: Add authentication
- TODO: Add single stream broadcasting
- TODO: Save chats to DB
