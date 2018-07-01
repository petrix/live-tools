$(function() {
       var toggleSelector = "#cdgo";
    $(document).bind('keyup', 'd', function() {
        socket.emit('custom countdown rm10s');
    });
    $(document).bind('keyup', 's', function() {
        socket.emit('custom countdown rm1m');
    });
    $(document).bind('keyup', 'a', function() {
        socket.emit('custom countdown rm10m');
    });
    $(document).bind('keyup', 'esc', function() {
        socket.emit('reset custom countdown');
    });
    $(document).bind('keyup', 'e', function() {
        socket.emit('custom countdown 10s');
    });
    $(document).bind('keyup', 'w', function() {
        socket.emit('custom countdown 1m');
    });
    $(document).bind('keyup', 'q', function() {
        socket.emit('custom countdown 10m');
    });
    $(document).bind('keyup', 'r', function() {
        socket.emit('toggle custom countdown');
    });
    $(document).bind('keyup', 'return', function() {
        socket.emit('toggle custom countdown');
    });

    // temp for debugging
    $("#timeofday").click(function() {
        addButtons('CAM1');
    });

    handshaking_module(ready);

    socket.on('custom play', function() {
        $(toggleSelector).removeClass('btn-warning');
        $(toggleSelector).addClass('btn-success');
// $('#cdbuttons').removeClass('fas fa-pause').addClass('fas fa-play');
// $(toggleSelector).html('<i class="fas fa-play"></i>');
        
        $('#cdgo #cdgo-play > i.fas').removeClass('fa-pause').addClass('fa-play');
        $('#dir_countdown_time').css("color","#194b80");
        // $('#cdgo #cdgo-play').removeClass('glyphicon-pause').addClass('glyphicon-play');
        // $('#cdgo span').text('START');
        // $('div#dir_countdown_time').css('color', '#646566');       
        socket.emit('status off air');
    });

    socket.on('custom pause', function() {
        $(toggleSelector).removeClass('btn-success');
        $(toggleSelector).addClass('btn-warning');
// $(toggleSelector).html('<i class="fas fa-pause"></i>');
// $('#cdbuttons').removeClass('fas fa-play').addClass('fas fa-pause');

        $('#cdgo #cdgo-play > i.fas').removeClass('fa-play').addClass('fa-pause');
        $('#dir_countdown_time').css("color","#194b80");
        // $('#cdgo #cdgo-play').removeClass('glyphicon-play').addClass('glyphicon-pause');
        // $('#cdgo span').text('PAUSE');

        socket.emit('status on air reset');

    });




    function ready() {

        if (identity.role[0].inputID !== 0) {
            tally_module(identity.role[0].inputID, '#display');
            $('#tally span').text(identity.role[0].shortName);
        }

        // Set up time of day
        timeofday_module('#timeofday_time span');

        // Setup Caspar Countdown Module
        casparcountdown_module('#vt_countdown_time', '#vt_countdown_title', true);

        // Setup Custom Countdown
        customcountdown_module('#dir_countdown_time', '#dir_countdown_title', true);

        // Setup Messaging Module
        messaging_module_initialise(newMessage, newAcknowledgement);

        // Setup RX time display
        // txtime_module('#livetimer', '#livestatusText', '#livestatus');
        txtime_module('#timeTX', '#livestatus span', '#livestatus');
        // Setup intercom controllers
        intercom_control_module();

        brightness_module('brightness');
        // refresh_module('refresh');
    }

    $('#timertoggle').click(function() {
        if($('#dir_countdown').is(':visible')){
        $('#dir_countdown').hide();
        // $('#countdown-items').hide();
        $('#timeofday').show();
        }else{
        $('#timeofday').hide();   
        $('#dir_countdown').show();
        // $('#countdown-items').show();
        }
    });
    $('#cdrm10m').click(function() {
        socket.emit('custom countdown rm10m');
    });
    $('#cdrm1m').click(function() {
        socket.emit('custom countdown rm1m');
    });
    $('#cdrm10s').click(function() {
        socket.emit('custom countdown rm10s');
    });
    $('#cdadd10s').click(function() {
        socket.emit('custom countdown 10s');
    });
    $('#cdadd1m').click(function() {
        socket.emit('custom countdown 1m');
    });
    $('#cdadd10m').click(function() {
        socket.emit('custom countdown 10m');
    });
    $('#cdreset').click(function() {
        socket.emit('reset custom countdown');
    });
    $('#cdgo').click(function() {
        socket.emit('toggle custom countdown');
    });
	$('#brightup').click(function() {
        socket.emit('brightness plus');
		// console.log("socket.emit brightness plus");
    });
	$('#brightdown').click(function() {
        socket.emit('brightness minus');
		// console.log("socket.emit brightness minus");
    });
    $('#refreshwall').click(function(){
        socket.emit('refresh wall');
        console.log("refresh");
    });

    
    $('#sndMsg').click(function() {
        messaging_module_broadcastMessage($('#customMessage').val());
        $('.status').css("background", "linear-gradient(to bottom, #F0AD4E 0px, #EB9316 100%)");
        $('#msgModal').modal('hide');
        $('#customMessage').val("");
    });
    function newAcknowledgement(senderId) {
        console.log('Acknowledgement from ' + senderId);
        $('#' + senderId + '-status').css("background", "linear-gradient(to bottom, #5CB85C 0px, #419641 100%)");
    }
    function newMessage(message, sender) {
        console.log('Message from ' + sender, message);
    }
});
