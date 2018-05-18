function intercom_control_module(localPlaybackAudio){
    var localstream;
    var peer;
    var peerId;
    var clientData;

    connectToBroker(identity._id, callClients);

    function callClients() {
        $.getJSON(location.protocol + '//' + location.host + '/clients/api', function(data) {
            data.forEach(function(role) {
                if (role.hasTalkBack) {
                    enableButton = false;
                    role.clients.forEach(function(client) {
                        if (client.isWebRtcCapable) {
                            startCall(client._id)
                            enableButton = true;
                        }
                        else {startCall(client._id)}

                    });
                    addButtons(role.shortName, role._id, enableButton);
                }
            });
            clientData = data;
        });
    }
   // var clock_timer = setInterval(function(){ callClients(); }, 10000);

    function connectToBroker(id, callback){
        peer = new Peer(id, {key: PEERJSKEY});

        // init microphone
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // save stream object pointer
        navigator.getUserMedia(
          {video: false, audio: true},
          function(stream) {
            localstream = stream;
            callback();
          },
        //   function(err) {
        //     console.log('Failed to get local stream' ,err);
        function(stream) {
            localstream = stream;
            callback();

        });

    };
    
    function addButtons(roleName, roleId, callActive){
        // add Tally
        $('<div class="point" id="' + roleId + '-tally"></div>').appendTo('#tallyIndicator');
        if (callActive){
            // add TX button
            $('<button class="btn-circle-lg btn btn-success txButton" id="' + roleId + '-muteTx"' + '>' + roleName + '</button>').bind("click", muteTx).appendTo('#txControl');
            // add RX button
            $('<button class="btn-circle-lg btn btn-success rxButton" id="' + roleId + '-muteRx"' + '>' + roleName + '</button>').bind("click", muteRx).appendTo('#rxControl');
        } else {
            // add TX button
            $('<button class="btn-circle-lg btn btn-default txButton" id="' + roleId + '-muteTx"' + '>' + roleName + '</button>').appendTo('#txControl');
            // add RX button
            $('<button class="btn-circle-lg btn btn-default rxButton" id="' + roleId + '-muteRx"' + '>' + roleName + '</button>').appendTo('#rxControl');
        }
        // add Status
        $('<div class="point status" id="' + roleId + '-status"></div>').appendTo('#statusIndicator');
    };

    function startCall(destination)
    {
        var call = peer.call(destination, localstream);
        call.on('stream', function(remoteStream) {
            // create new <audio> object in #playback for playback
            jQuery('<audio/>', {
                id: destination + '-player',
                autoplay: true,
            }).appendTo('#playback');
            audio = document.getElementById(destination + '-player');
            audio.src = URL.createObjectURL(remoteStream);
        });
        // send signal to all clients that not muted
    };



    // mute director's playback on selected role
    function muteTx(){
        buttonId = $(this).attr('id')
        roleToMute = buttonId.substring(0, $(this).attr('id').length - 7);
        if ($("#" + buttonId).hasClass( 'btn-danger' )) {
            $("#" + buttonId).removeClass( 'btn-danger' ).addClass( 'btn-success' );
            // unmute
            // B1
            socket.emit('tell client to listen to director', roleToMute);
        } else {
            // mute
            // B2
            
            $("#" + buttonId).removeClass( 'btn-success' ).addClass( 'btn-danger' );
            socket.emit('tell client to not listen to director', roleToMute);
        };
    };

    function muteRx(){
        buttonId = $(this).attr('id')
        roleToMute = buttonId.substring(0, $(this).attr('id').length - 7);
        if ($("#" + buttonId).hasClass( 'btn-danger' )) {
            $("#" + buttonId).removeClass( 'btn-danger' ).addClass( 'btn-success' );
            //$('#' + client._id + '-player').muted = true;
            // unmute
            //$("#" + client._id + '-player').prop('muted', false);
            unmutePlayer(roleToMute);
            socket.emit('tell client that director is listening', roleToMute);
        } else {
            $("#" + buttonId).removeClass( 'btn-success' ).addClass( 'btn-danger' );
           // $('#' + client._id + '-player').muted = false;
            // mute
            //$("#" + client._id + '-player').prop('muted', true);
            mutePlayer(roleToMute);
            socket.emit('tell client that director is not listening', roleToMute);
        };
    };

    function mutePlayer(playerId){
        clientData.forEach(function(role) {
            if(role._id == playerId){
                role.clients.forEach(function(client) {
                    $('#' + client._id + '-player').muted = true;
                    //document.getElementById(client._id + '-player').muted = true;
                })
            }
            else {
                console.log(role._id, playerId);
                console.log(':()');
            }
        });
        // B3
        socket.emit('tell client that director is not listening', roleToMute);
        $('#' + playerId + '-muteRx').removeClass( 'btn-success' ).addClass( 'btn-danger' );
    }

    function unmutePlayer(playerId){
        clientData.forEach(function(role) {
            if(role._id == playerId){
                role.clients.forEach(function(client) {
                    $('#' + client._id + '-player').muted = false;
                   // document.getElementById(client._id + '-player').muted = false;
                })
            }
            else {
                console.log(role._id, playerId);
                console.log(':():');
            }
        });

        // B4
        socket.emit('tell client that director is listening', roleToMute);
        $('#' + playerId + '-muteRx').removeClass( 'btn-danger' ).addClass( 'btn-success' );
    }

    // A1
    socket.on('director: client not listening', function(roleId){
        $("#" + roleId + "-muteTx").removeClass( 'btn-success' ).addClass( 'btn-danger' );
    });

    // A2
    socket.on('director: client listening', function(roleId){
        $("#" + roleId + "-muteTx").removeClass('btn-danger').addClass( 'btn-success' );   
    });

    //A3
    socket.on('director: listen to client', function(roleId){
        // unmute if muted
        unmutePlayer(roleId);
    });

    //A4
    socket.on('director: stop listening to client', function(roleId){
        // unmute if muted
        mutePlayer(roleId);
    });

}
