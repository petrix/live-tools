
var brightnessValue = 80;


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
                if (brightnessValue < 30){
                    brightnessValue = 30;
                }

                    io.emit('brightness value', brightnessValue);
                    // console.log("brightValue - " + brightnessValue);

        });



        try {
            clearInterval(brightUpdateTimer);
            }
        catch (err){};
            brightUpdateTimer = setInterval(function() {
            io.emit('brightness value', brightnessValue);
                }, 1000);

  });




}
