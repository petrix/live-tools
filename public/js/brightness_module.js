function brightness_module(brightnessValue) {

         socket.on('brightness', function(brightchanger) {
			$('body').css('filter', 'brightness(' + brightchanger + ')');
			 console.log(brightchanger);

    });

}
