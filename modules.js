module.exports = function(http) {
    var io = require('socket.io')(http);

    var clientManager = require('./lib/client-manager');
    clientManager.initialise(io);
    clientManager.start();

    var atem = require('./lib/atem');
    atem.initialise(io);
    atem.start();

    var clock = require('./lib/timeofday')(io);
    var customCountdown = require('./lib/custom-countdown')(io);
    var messagingModule = require('./lib/messaging_module')(io);
    var txtimeModule = require('./lib/txtime_module')(io);
	var brightnessModule = require('./lib/brightness')(io);
    var intercom_control_module = require('./lib/intercom_control_module')(io);

    var casparCountdown = require('./lib/caspar-countdown');
    casparCountdown.initialise(io);
    casparCountdown.start();

};
