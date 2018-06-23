
function brightness_module(brightnessValue) {

         socket.on('brightness value', function(brightchanger) {
			var brightvalue = (brightchanger * 100).toFixed(0);
			$('#display-multi-layout').css('filter', 'brightness(' + brightvalue + '%)');
			$('span.glyphicon').css('filter', 'brightness(' + brightvalue + '%)');
			$('span#brightval').css('filter', 'brightness(' + brightvalue + '%)');
				console.log("brightness - " + brightvalue);
			 $('span#brightval').text(brightvalue + "%");


    });

}