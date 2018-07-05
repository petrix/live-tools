
var brightnessValue = 80;
brightnessclockValue = 0;


module.exports = function(io) {
    io.emit('brightness value', brightnessValue);
    io.on('connection', function(socket) {
  
        socket.on('brightness plus', function(brightchanger) {
          
                brightnessValue += 5;
                if (brightnessValue > 150){
                    brightnessValue = 150;
                }

                    io.emit('brightness value', brightnessValue);
                    // console.log("brightValue - " + brightnessValue);

        });
        socket.on('brightness minus', function(brightchanger) {
           
                brightnessValue -= 5;
                if (brightnessValue < 5){
                    brightnessValue = 5;
                }

                    io.emit('brightness value', brightnessValue);
                    // console.log("brightValue - " + brightnessValue);

        });
        socket.on('brightness clock plus', function(brightclockchanger) {
          
                brightnessclockValue += 10;
                if (brightnessclockValue > 1000){
                    brightnessclockValue = 1000;
                }

                    io.emit('brightness clock value', brightnessclockValue);
                    // console.log("brightclockValue - " + brightnessclockValue);

        });
        socket.on('brightness clock minus', function(brightclockchanger) {
           
                brightnessclockValue -= 10;
                if (brightnessclockValue < 0){
                    brightnessclockValue = 0;
                }

                    io.emit('brightness clock value', brightnessclockValue);
                    // console.log("brightclockValue - " + brightnessclockValue);

        });


        try {
            clearInterval(brightUpdateTimer);
            }
        catch (err){};
            brightUpdateTimer = setInterval(function() {
            io.emit('brightness value', brightnessValue);
            io.emit('brightness clock value', brightnessclockValue);
                }, 1000);

  });




}
