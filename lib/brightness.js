
var brightnessValue = 0.9;


module.exports = function(io) {
    io.on('connection', function(socket) {
  
        socket.on('brightness plus', function(brightchanger) {
                brightnessValue = brightnessValue + 0.05;
                if (brightnessValue > 1.5){
                    brightnessValue = 1.5;
                }
                io.emit('brightness value', brightnessValue);
                console.log("brightValue - " + brightnessValue);
        });
        socket.on('brightness minus', function(brightchanger) {
                brightnessValue = brightnessValue - 0.05;
                if (brightnessValue < 0.3){
                    brightnessValue = 0.3;
                }
                io.emit('brightness value', brightnessValue);
                console.log("brightValue - " + brightnessValue);
        });
  });




}
