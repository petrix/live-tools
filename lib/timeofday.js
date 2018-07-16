var net = require('net');
function getNetworkIP(callback) {
  var socket = net.createConnection(80, 'www.google.com');
  socket.on('connect', function() {
    callback(undefined, socket.address().address);
    // console.log(socket);
    socket.end();
  });
  socket.on('error', function(e) {
    callback(e, 'error');
  });
}


module.exports = function(io) {
    setInterval(function() {
        var date = new Date().getTime();
        // date += 3610000;
        io.emit('timeofday', date);
        // console.log(date);
      getNetworkIP(function (error, ip) {
	io.emit('ip', ip);
    // console.log("ip+"+ip);
    if (error) {
        console.log('error:', error);
        // try { clearInterval(ipfunction); } catch (err) {};
    }
});
    }, 500);
};