
var brightnessValue = 90;


module.exports = function(io) {
    io.emit('brightness value', brightnessValue);
    io.on('connection', function(socket) {
  
        socket.on('brightness plus', function(brightchanger) {
          
                brightnessValue = brightnessValue + 5;
                if (brightnessValue > 150){
                    brightnessValue = 150;
                }
                try {
                clearInterval(brightUpdateTimer);
            }
            catch (err){};
                io.emit('brightness value', brightnessValue);
                console.log("brightValue - " + brightnessValue);
                 brightUpdateTimer = setInterval(function() {
                io.emit('brightness value', brightnessValue);
                }, 1000);

        });
        socket.on('brightness minus', function(brightchanger) {
            try {
                clearInterval(brightUpdateTimer);
            }
            catch (err){};
                brightnessValue = brightnessValue - 5;
                if (brightnessValue < 30){
                    brightnessValue = 30;
                }
                io.emit('brightness value', brightnessValue);
                console.log("brightValue - " + brightnessValue);
                 brightUpdateTimer = setInterval(function() {
                io.emit('brightness value', brightnessValue);
                }, 1000);
        });
        
                 // clearInterval(brightUpdateTimer);
           
        // brightUpdateTimer = setInterval(function() {
        //         io.emit('brightness value', brightnessValue);
        //         }, 1000);
               
  });




}
