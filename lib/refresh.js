var refreshValue = 0;
module.exports = function(io) {
    io.on('connection', function(socket) {  
        socket.on('refresh wall', function(refresher) {
                refreshValue += 1;
                    io.emit('refresh', refreshValue);
                    // console.log("refreshValue - " + refreshValue);
                    refreshValue = 0;
        });




/*var net = require('net');
function getNetworkIP(callback) {
  var socket = net.createConnection(80, 'www.google.com');
  socket.on('connect', function() {
    callback(undefined, socket.address().address);
    socket.end();
  });
  socket.on('error', function(e) {
    callback(e, 'error');
  });
}
// try { clearInterval(ipfunction); } catch (err) {};
// setInterval(function(){
getNetworkIP(function (error, ip) {
	io.emit('ip', ip);
    console.log("ip+"+ip);
    if (error) {
        console.log('error:', error);
        // try { clearInterval(ipfunction); } catch (err) {};
    }
});*/
// }, 10000);

  });
}