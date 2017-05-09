//imports 
var app = require('http').createServer();
var io = require('socket.io').listen(app);
var port = 8888;
var fs = require('fs');
var five = require("johnny-five");
var Particle = require("particle-io");

//configuration import
require('dotenv').config();


// Particle Photon init
var board = new five.Board({
  io: new Particle({
    token: process.env.TOKEN,
    deviceId: process.env.DEVICE_ID
  })
});

board.on("ready", function () {
  console.log('Board is ready!');

  //define wheel and motor contol
  var speed;

  var rightWheel = new five.Motor({
    pins: {
      pwm: "D0",
      dir: "D4"
    },
    invertPWM: true
  });

  var leftWheel = new five.Motor({
    pins: {
      pwm: "D1",
      dir: "D5"
    },
    invertPWM: true
  });

  io.on('connection', function (socket) {

    console.log("Node bot is awaiting commands!");

    socket.on('command', function (command) {

      console.log("bot: " + command);
      switch (command) {

        case 'forward':
          speed = 255;
          leftWheel.fwd(speed);
          rightWheel.fwd(speed);
          break;

        case 'reverse':
          speed = 120;
          leftWheel.rev(speed);
          rightWheel.rev(speed);
          break;

        case 'left':
          var aSpeed = 220;
          var bSpeed = 50;
          leftWheel.fwd(aSpeed);
          rightWheel.rev(bSpeed);
          break;
        case 'right':
          var aSpeed = 50;
          var bSpeed = 220;
          leftWheel.rev(aSpeed);
          rightWheel.fwd(bSpeed);
          break;
        case 'stop':
          leftWheel.stop();
          rightWheel.stop();
          break;
      }
    });
    
    // On disconnect
    socket.on('disconnect', function () {

      socket.emit('disconnected', socket.id);
      console.log('NodeBot has lost connection!');

    });

  });

});

console.log("listening on port: ", port);
app.listen(port);
