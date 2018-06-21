function txtime_module(timeSelector, titleSelector, divSelector, liveFunction) {

//     socket.on('live status', function(duration, status) {
        // socket.on('current language', function(language){
        //     switch(status) {
        //     case 'lang ru':
        //     moment.lang(ru);
        //     date = moment().format('dddd ll'); 
        //     $(langSelector).text(date);
        //         break;
        //         case 'lang en':
        //     moment.lang(en);
        //     date = moment().format('dddd ll'); 
        //     $(langSelector).text(date);
        //         break;
        // }
        // });










         socket.on('live status', function(status) {

//         hours = Math.floor(duration / 3600);
//         minutes = Math.floor((duration - hours * 3600) / 60);
//         seconds = duration - (minutes * 60 + hours * 3600);

//         seconds = seconds.toFixed(0);

//         hours = (hours < 10 ? "0" : "") + hours;
//         minutes = (minutes < 10 ? "0" : "") + minutes;
//         seconds = (seconds < 10 ? "0" : "") + seconds;

//         $(timeSelector).text(hours + ':' + minutes + ':' + seconds);

        switch(status) {
            case 'on air':
                $(titleSelector).text('ON AIR');
                $(divSelector).css('background', '#EF4136');
                if (liveFunction) {
                    liveFunction(true);
                }
                break;
            case 'off air':
                $(titleSelector).text('OFF AIR');
                $(divSelector).css('background', '#7e0000');
                if (liveFunction) {
                    liveFunction(false);
                }
                break;
        }
    });

}
