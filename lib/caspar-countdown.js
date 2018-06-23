var osc = require('osc-min');
var udp = require('dgram');
var sock, io;
var configurationDatabase = require('./configuration');

module.exports.initialise = function(newIO) {
    io = newIO;
};

module.exports.start = function() {
    configurationDatabase.getConfigEntry('CasparCG')

    .then(function(config) {
        var CHANNEL = config.value.channel;
        var LAYER = config.value.layer;
        var PORT = config.value.port;
        sock = udp.createSocket("udp4", function(msg, rinfo) {
            try {
                var message = osc.fromBuffer(msg); // Message from buffer (A bundle containing many elements)
                if (message.oscType === "bundle") {
                    message.elements.forEach(function(entry) {
                        if (entry.address.indexOf("/channel/" + CHANNEL) != -1 && entry.address.indexOf("/stage/layer/" + LAYER) != -1) {
                             
                            if (entry.address.indexOf("/file") != -1) {
                               
                            if (entry.address.indexOf("/path") != -1) {
                                sendPathData(entry.args[0].value);
                                // console.log(entry.args[0]);
                            }
                            if (entry.address.indexOf("/time") != -1) {
                                var remainingTime = entry.args[1].value - entry.args[0].value;
                                sendTimeData(remainingTime, entry.args[1].value);
                                // console.log(remainingTime);
                            }
                        
                            if (entry.address.indexOf("/fps") != -1) {
                                sendPausedData(entry.args[2].value);
                                // console.log(entry.args[2].value);
                            }
}



                        // else{

                    // if (entry.address.indexOf("/channel/" + CHANNEL) != -1 && entry.address.indexOf("/stage/layer/" + LAYER) != -1) {
                        
                            


                        }
                    // }
                    });//<--- END OF  message.elements.forEach(function(entry)
                }
            } catch (_error) {
                return console.error(_error.red);
            }
        });
        sock.bind(PORT);
        console.log("CasparCG OSC Listener Started: ".bold + PORT);
        function sendTimeData(remainingTime, totalTime) {
            io.emit('cg countdown timeData', remainingTime, totalTime);
        }
        function sendPathData(path) {
            io.emit('cg countdown path', path);
        }
        io.on('connection', function(socket) {
            socket.on('restart', function (component) {
                if (component === 'CasparCG') {
                    console.log("CasparCG OSC Listener Stopped".bold.red);
                    sock.close();
                    exports.start();
                    socket.emit('restarting');
                }
            });
        });
    })
    .catch(function(error) {
        console.error('Caspar Configuration Error'.red.bold, error);
    });
};
