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

  var motors = new five.Motors([{
      pins: {
        dir: 'D4',
        pwm: 'D0'
      },
      invertPWM: true
    },
    {
      pins: {
        dir: 'D5',
        pwm: 'D1'
      },
      invertPWM: true
    }
  ]);

  board.repl.inject({
    motors: motors
  });

  io.on('connection', function (socket) {

    console.log("Node bot is awaiting commands!");

    socket.on('command', function (command) {

      console.log("bot: " + command);
      switch (command) {

        case 'forward':
          motors.forward(255);
          break;
        case 'reverse':
          motors.reverse(255);
          break;

        case 'left':
          motors[0].reverse(200);
          motors[1].forward(200);
          break;

        case 'right':
          motors[0].forward(200);
          motors[1].reverse(200);
          break;

        case 'stop':
          motors.stop();
          break;
      }
    });

    // On disconnect
    socket.on('disconnect', function () {

      socket.emit('disconnected', socket.id);
      leftWheel.stop();
      rightWheel.stop();
      console.log('NodeBot has lost connection!');

    });

  });

});

console.log("listening on port: ", port);
app.listen(port);
