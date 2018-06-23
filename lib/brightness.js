var brightnessValue = 0.8;

module.exports = function(io) {
    io.on('connection', function(socket) {

        socket.on('brightness plus', function(brightchanger) {
                brightnessValue = brightnessValue + 0.1;
                io.emit('brightness', brightnessValue);
				console.log(brightnessValue);
        });
		socket.on('brightness minus', function(brightchanger) {
                brightnessValue = brightnessValue - 0.1;
                io.emit('brightness', brightnessValue);
				console.log(brightnessValue);
        });
        
       
    });
}
