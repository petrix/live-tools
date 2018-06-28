
var refreshValue = 0;


module.exports = function(io) {

    io.on('connection', function(socket) {
  
        socket.on('refresh wall', function(refresher) {
                refreshValue += 1;

                    io.emit('refresh', refreshValue);
                    // console.log("refreshValue - " + refreshValue);
                    refreshValue = 0;

        });



  });




}
