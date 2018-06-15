$(function() {

    // temp for debugging
    $("#timeofday").click(function() {
        addButtons('CAM1');
    });

    handshaking_module(ready);

    // socket.on('custom active', function(customActive){
    //     toggleSelector = "#cdtoggle"
    //     if (customActive){
    //         if ($(toggleSelector).hasClass( 'btn-danger' )) {
    //             $(toggleSelector).toggleClass( 'btn-success' );
    //             $(toggleSelector).toggleClass( 'btn-danger' );
    //             $(toggleSelector).text('DIR. COUNTDOWN');
    //             $('#countdown-items').show();
    //             //$('.' + $(this).val()).show();
    //         };
    //     } else {
    //         if ($(toggleSelector).hasClass( 'btn-success' )) {
    //             $(toggleSelector).toggleClass( 'btn-danger' );
    //             $(toggleSelector).toggleClass( 'btn-success' );
    //             $(toggleSelector).text('TRACK ON-AIR');
    //             $('#countdown-items').hide();
    //             //$(#countdown).css("color", "#ccc");
    //         };
    //     };
    // });

    socket.on('custom play-pause', function(customActive2){
        toggleSelector2 = "#cdgo"
        if (customActive2){
            if ($(toggleSelector2).hasClass( 'btn-danger' )) {
                $(toggleSelector2).addClass( 'btn-danger' );
                $(toggleSelector2).removeClass( 'btn-success' );
                $(toggleSelector2).text('DIR. COUNTDOWN');
                // $('#countdown-items').show();
                //$('.' + $(this).val()).show();
            };
        } else {
            if ($(toggleSelector2).hasClass( 'btn-success' )) {
                $(toggleSelector2).addClass( 'btn-success' );
                $(toggleSelector2).removeClass( 'btn-danger' );
                $(toggleSelector2).text('TRACK ON-AIR');
                // $('#countdown-items').hide();
                //$(#countdown).css("color", "#ccc");
            };
        };
    });

    function ready() {

        // Set Up Tally
        if (identity.role[0].inputID !== 0) {
            tally_module(identity.role[0].inputID, '#display');
            $('#tally span').text(identity.role[0].shortName);
        }

        // Set up time of day
        timeofday_module('#timeofday span');

        // Setup Caspar Countdown Module
        casparcountdown_module('#vt_countdown_time', '#vt_countdown_title', true);

        // Setup Custom Countdown
        customcountdown_module('#dir_countdown_time', '#dir_countdown_title', true);

        // Setup Messaging Module
        messaging_module_initialise(newMessage, newAcknowledgement);

        // Setup RX time display
        txtime_module('#livetimer', '#livestatusText', '#livestatus');

        // Setup intercom controllers
        intercom_control_module();

        // init countdown
        // $("#cdtoggle").trigger( "click" );
        // $("#cdgo").trigger( "click" );
    }

    // toggle on air status
    var liveMouseDown;

    $('#livestatus').mousedown(function() {
        liveMouseDown = setTimeout(function() {
            switch($('#livestatus').css('background-color')) {
                case 'rgb(239, 65, 54)':
                    socket.emit('status off air');
                    break;
                case 'rgb(126, 0, 0)':
                    socket.emit('status on air reset');
                    break;
            }
        }, 1200);
    });
    $('#livestatus').mouseup(function() {
        if (liveMouseDown) {
            clearTimeout(liveMouseDown);
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

    $('#cdtoggle').click(function() {
        socket.emit('toggle countdowns');
    });

    $('#sndMsg').click(function() {
        messaging_module_broadcastMessage($('#customMessage').val());
        $('.status').css("background", "linear-gradient(to bottom, #F0AD4E 0px, #EB9316 100%)");
        $('#msgModal').modal('hide');
        $('#customMessage').val("");
    });

    function newAcknowledgement(senderId) {
        console.log('Acknowledgement from ' + senderId);
        $('#' + senderId +'-status').css("background", "linear-gradient(to bottom, #5CB85C 0px, #419641 100%)");
    }

    function newMessage(message, sender) {
        console.log('Message from ' + sender, message);
    }


});
