var osc = require('osc-min');
var udp = require('dgram');
var sock, io;
var configurationDatabase = require('./configuration');
var d;

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
                                // console.log(entry.args[1].value);
                                // console.log(remainingTime);
                            }
                            
                        
                        var val = entry.address.indexOf("/channel/" + CHANNEL + "/stage/layer/" + LAYER + "/paused");
                            // console.log(val);
                        if (val == -1 ){
                            if(remainingTime != undefined){
                            d = new Date().getTime() / 1000;
                            df = d.toFixed(0);
                            rf = remainingTime.toFixed(0);
                            var outtime = (d + remainingTime);
                             outtime=(outtime.toFixed(0));
                             // sendOutData (outtime);
                             io.emit('cg countdown outdata', outtime);
                             // console.log(outtime);
                             
                             // console.log(df.toString());
                            // console.log(remainingTime);
                            }
                        }
}
                        }
                    
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
        // function sendOutData(outdata){
        //     io.emit('cg countdown outdata', outtime);
        // }
       
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
