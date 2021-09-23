//  socket controller
const controller = require('../controllers/socket.controller');
// middleware user authenticator
const authJwt = require("../middleware/authJwt");

module.exports = io => socket => {
  //numOfusers++;
//  console.log("Number of user: " + numOfusers);

  socket.on("send_message", (data) => {
    console.log("socket id: " + socket.id);
    console.log(data);
  //  numofMessages++;
    socket.broadcast.emit("receive_message", data.content); //Get message and broadcast to all except sender
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    //numOfusers--;
  });


  socket.on("workout_completed", (data) => {
    console.log("Workout has been completed by Athlete")
    //Check data to get user
    //Get User trainer
    //Broadcast to trainer
  });
}
