//imports 
var app = require('http').createServer();
var io = require('socket.io').listen(app);
var port = 8888;
var fs = require('fs');
var five = require("johnny-five");
var Particle = require("particle-io");

//configuration import
require('dotenv').config();

// On socket conection
io.sockets.on('connection', function () {

  // On connection emit socket Identifer
  console.log("socket connected", socket.id);
  stop(); // Halts bot functions to prevent unwanted momentment on connection 

  // On movement command execute directional response
  socket.on('command', function (command) {

    // Console Log Command
    console.log("bot: " + command);
    switch (command) {

      case 'forward':
        forward();
        break;
      case 'reverse':
        reverse();
        break;
      case 'left':
        left();
        break;
      case 'right':
        right();
        break;
      case 'stop':
        stop();
        break;
    };
  });

  // On disconnect
  socket.on('disconnect', function () {

    socket.emit('disconnected');
    console.log('NodeBot has lost connection!');

  });

});

// Particle Photon init
var board = new five.Board({
  io: new Particle({
    token: process.env.TOKEN,
    deviceId: process.env.DEVICE_ID
  })
});

board.on("ready", function () {
  console.log('ready');

  //define wheel and motor contol
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

  // set speed global variable
  var speed = 255;

  // motor functions
  function reverse() {
    leftWheel.rev(speed);
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function left() {
    leftWheel.fwd(speed);
    rightWheel.rev(speed);
  }

  function right() {
    leftWheel.rev(speed);
    rightWheel.fwd(speed);
  }

  function exit() {
    leftWheel.rev(0);
    rightWheel.rev(0);
    setTimeout(process.exit, 1000); // stops with 1sec buffer
  }

  // map keys to functions with object
  var keyMap = {
    'up': forward,
    'down': reverse,
    'left': left,
    'right': right,
    'space': stop,
    'q': exit
  };

  // input modes for manual robot control
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function (chunk, key) {
    if (!key || !keyMap[key.name]) return;

    keyMap[key.name]();
  });
});

console.log("listening on port: ", port);
app.listen(port);