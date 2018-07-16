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
                        if (entry.address.indexOf("/channel/" + CHANNEL) != -1){ 
                            if (entry.address.indexOf("/stage/layer/" + LAYER) != -1) {
                             
                            if (entry.address.indexOf("/file") != -1) {
                               
                            if (entry.address.indexOf("/path") != -1) {
                                sendPathData(entry.args[0].value);
                                // console.log(entry.args[0].value);
                            }
                            if (entry.address.indexOf("/time") != -1) {
                                var remainingTime = entry.args[1].value - entry.args[0].value;
                                sendTimeData(remainingTime, entry.args[1].value);
                                // console.log(entry.args[1].value);
                                // console.log(remainingTime);
                            }
                            }
                        }

/*                        if (entry.address.indexOf("/paused") !=-1 ){
                                var paused = (entry.args[0].value);
                                console.log("/paused---:" + paused);
                                if(entry.args[0].value == false){
                                    if(remainingTime != undefined){
                            d = new Date().getTime() / 1000;
                            var outtime = (d + remainingTime);
                             outtime=(outtime.toFixed(0));
                             io.emit('cg countdown outdata', outtime);
                                                         }
                                }
                            }*/

                        var val = entry.address.indexOf("/stage/layer/" + LAYER + "/paused");
                        if (val = -1 ){
                       
                            if(remainingTime != undefined){
               // console.log(val);
                        
                            d = new Date().getTime() / 1000;
                            var outtime = (d + remainingTime);
                             outtime=(outtime.toFixed(0));
                             io.emit('cg countdown outdata', outtime);
                                                         }
                                        }   
                            if (entry.address.indexOf("/mixer/audio/1/dBFS") !=-1 ){
                                // console.log("auLeftValue ---:" + entry.args[0].value);
                                io.emit('cg volume 1ch', entry.args[0].value);
                            }
                            if (entry.address.indexOf("/mixer/audio/2/dBFS") !=-1 ){
                        // console.log("auRightValue --:" + entry.args[0].value);
                                io.emit('cg volume 2ch', entry.args[0].value);
                            }
                            /*if (entry.address.indexOf("/mixer/audio/1/pFS") !=-1 ){
                             // console.log("auLeftPfs ---:" + (entry.args[0].value));
                                io.emit('cg pfs 1ch', entry.args[0].value);
                            }
                            if (entry.address.indexOf("/mixer/audio/2/pFS") !=-1 ){
                             // console.log("auRightPfs --:" + entry.args[0].value);
                                io.emit('cg pfs 2ch', entry.args[0].value);
                            }*/
                     
}
                        

                    });//<--- END OF  message.elements.forEach(function(entry)
                /*message.elements.forEach(function(nbChannels) {
                       if (nbChannels.address.indexOf("/channel/1/stage/layer/10/file/paused") !=-1 ){
                        console.log("nb_channels ---:" + nbChannels.args[0].boolean);
                        // io.emit('cg volume 1ch', auLeftValue.args[0].value);
                       }
                       });*/
                        /*message.elements.forEach(function(auLeftValue) {
                       if (auLeftValue.address.indexOf("/channel/" + CHANNEL + "/mixer/audio/1/dBFS") !=-1 ){
                        // console.log("auLeftValue ---:" + auLeftValue.args[0].value);
                        io.emit('cg volume 1ch', auLeftValue.args[0].value);
                       }
                       });
                       message.elements.forEach(function(auRightValue) {
                       if (auRightValue.address.indexOf("/channel/" + CHANNEL + "/mixer/audio/2/dBFS") !=-1 ){
                        // console.log("auRightValue --:" + auRightValue.args[0].value);
                        io.emit('cg volume 2ch', auRightValue.args[0].value);
                       }
                     });*/
                       /*message.elements.forEach(function(auLeftPfs) {
                       if (auLeftPfs.address.indexOf("/channel/1/mixer/audio/1/pFS") !=-1 ){
                        // console.log("auLeftPfs ---:" + (auLeftPfs.args[0].value));
                        io.emit('cg pfs 1ch', auLeftPfs.args[0].value);
                       }
                       });
                       message.elements.forEach(function(auRightPfs) {
                       if (auRightPfs.address.indexOf("/channel/1/mixer/audio/2/pFS") !=-1 ){
                        // console.log("auRightPfs --:" + auRightPfs.args[0].value);
                        io.emit('cg pfs 2ch', auRightPfs.args[0].value);
                       }
                     });*/
                        // }
                  /*      var auRightCh = entry.address.indexOf("/channel/" + CHANNEL + "/mixer/audio/2");
                            
                            console.log("auRightCh = " + auRightCh);*/

}
                    /*    if (val == -1 ){
                            if(remainingTime != undefined){
                            d = new Date().getTime() / 1000;
                            df = d.toFixed(0);
                            rf = remainingTime.toFixed(0);
                            var outtime = (d + remainingTime);
                             outtime=(outtime.toFixed(0));
                             io.emit('cg countdown outdata', outtime);*/

                        


                             // console.log(outtime);
                             
                             // console.log(df.toString());
                            // console.log(remainingTime);
                           

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
        /*function sendOutData(outdata){
            io.emit('cg countdown outdata', outtime);
        }*/
       
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
