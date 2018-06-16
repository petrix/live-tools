var updateCountdown;
var active = false;
var data = new Object();
data.duration = 0;
data.customActive = true;

module.exports = function(io) {

    io.on('connection', function(socket) {

//         socket.on('active custom status', function() {
//             // io.emit('custom pause', data.customActive);
//        customStx = 0;
//        customSty = 0;
//         updateCountdown = setInterval(function() {
//         if (customStatus = true) {
//             io.emit('custom play', data.customActive);
//         customStx = customStx + 1;
//     } else {
//             io.emit('custom pause', data.customActive);
//         }
// console.log(customStx);
// console.log(customSty);
//         }, 200);
// if (customStx == customSty){
//     customStatus = false;
//     io.emit('custom play', data.customActive);
// }

//         });

        socket.on('custom countdown rm10m', function() {
            if (data.duration > 0) {
                if (data.customActive) {
                    data.duration = data.duration - 600;
                    io.emit('countdown', data);
                }
            }
        });

        socket.on('custom countdown rm1m', function() {
            if (data.duration > 0) {
                if (data.customActive) {
                    data.duration = data.duration - 60;
                    io.emit('countdown', data);
                }
            }
        });

        socket.on('custom countdown rm10s', function() {
            if (data.duration > 0) {
                if (data.customActive) {
                    data.duration = data.duration - 10;
                    io.emit('countdown', data);
                }
            }
        });

        socket.on('custom countdown 10s', function() {
            if (data.customActive) {
                data.duration = data.duration + 10;
                io.emit('countdown', data);
            }
        });

        socket.on('custom countdown 1m', function() {
            if (data.customActive) {
                data.duration = data.duration + 60;
                io.emit('countdown', data);
            }
        });

        socket.on('custom countdown 10m', function() {
            if (data.customActive) {
                data.duration = data.duration + 600;
                io.emit('countdown', data);
            }
        });

        socket.on('reset custom countdown', function() {
            // if (data.customActive) {
                try {
                    clearInterval(updateCountdown);
                } catch (err) {};
                data.duration = 0;
                io.emit('cdactive false');
                     console.log("active = false"); 
                active = false;
                // $(timeSelector).css( "color" , "#d4d5d6" ); 
                io.emit('countdown', data);
                
            // }
        });

        socket.on('toggle custom countdown', function() {

            if (data.duration > 0) {
                try { clearInterval(updateCountdown); } catch (err) {};
                if (active != true) {
                    active = true;
                    startCountdown();
                    io.emit('countdown', data);
                    io.emit('custom pause', data.customActive);
                    io.emit('cdactive true', active);
                   
                   console.log("active = true"); 
                } else {
                    active = false;
                    io.emit('countdown', data);
                     io.emit('custom play', data.customActive);
                     io.emit('cdactive false', active);
                     console.log("active = false"); 
                }
            }
        });


        // socket.on('pause custom countdown', function() {

        //     if (data.duration > 0) {
        //         try { clearInterval(updateCountdown); } catch (err) {};
        //         if (active != true) {
        //             active = true;
        //             io.emit('countdown', data);
        //             io.emit('custom pause', data.customActive);
        //         }
        //     }
        // });


        // socket.on('play custom countdown', function() {

        //     if (data.duration > 0) {
        //         try { clearInterval(updateCountdown); } catch (err) {};
        //         if (active = true) {
        //             active = false;
        //             startCountdown();
        //             io.emit('countdown', data);
        //             io.emit('custom play', data.customActive);
        //         }
        //     }
        // });
// socket.on('cdstatus', function() {
//             if (cdstatus = true) {
//                 io.emit('custom play', data.customActive);
               
//                } else {
//                 io.emit('custom pause', data.customActive);
                
//                 }
            
//         });


        // socket.on('toggle countdowns', function() {
        //     data.customActive ? data.customActive = false : data.customActive = true;
        //     io.emit('custom active', data.customActive);
        //     io.emit('countdown', data);
        // });
    });

    function startCountdown() {
        try { clearInterval(updateCountdown); } catch (err) {};
        updateCountdown = setInterval(function() {
            data.duration = data.duration - 0.04;
            if (data.duration < 0.04) {
                active = false;
                data.duration = 0;
            }

            io.emit('countdown', data);
        }, 40);
    };
}