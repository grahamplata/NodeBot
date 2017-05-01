var five = require("johnny-five");
var Particle = require("particle-io");
require('dotenv').config();

var board = new five.Board({
    io: new Particle({
        token: process.env.TOKEN,
        deviceId: process.env.DEVICE_ID
    })
});

board.on("ready", function () {
    console.log('ready');

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

    var speed = 255;

    function reverse() {
        leftWheel.rev(speed);
        rightWheel.rev(speed);
        console.log("reverse");
    }

    function forward() {
        leftWheel.fwd(speed);
        rightWheel.fwd(speed);
        console.log("forward");
    }

    function stop() {
        leftWheel.stop();
        rightWheel.stop();
        console.log("stop");
    }

    function left() {
        leftWheel.rev(speed);
        rightWheel.fwd(speed);
        console.log("left");
    }

    function right() {
        leftWheel.fwd(speed);
        rightWheel.rev(speed);
        console.log("right");
    }

    function exit() {
        leftWheel.rev(0);
        rightWheel.rev(0);
        console.log("exiting");
        setTimeout(process.exit, 1000);
    }

    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();

    stdin.on("keypress", function (chunk, key) {
        if (!key) return;

        switch (key.name) {
            case 'up':
            case 'w':
                forward();
                break;

            case 'down':
            case 's':
                reverse();
                break;

            case 'left':
            case 'a':
                left();
                break;

            case 'right':
            case 'd':
                right();
                break;

            case 'space':
            case 'escape':
                stop();
                break;
        }
    });
});