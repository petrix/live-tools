
function brightness_module(brightValue) {

         socket.on('brightness value', function(brightchanger) {
         	// updateData(true, socket.brightchanger);
			var brightValue = brightchanger;
			$('#display-multi-layout').css('filter', 'brightness(' + brightValue + '%)');
			$('span.glyphicon').css('filter', 'brightness(' + brightValue + '%)');
			$('span#brightval').css('filter', 'brightness(' + brightValue + '%)');
				// console.log("brightness - " + brightValue);
			 $('span#brightval').text(brightValue + "%");
                

             
    });

}