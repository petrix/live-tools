
function brightness_module(brightValue, brightclockValue) {

         socket.on('brightness value', function(brightchanger) {
         	// updateData(true, socket.brightchanger);
			var brightValue = brightchanger;
			$('#display-multi-layout').css('filter', 'brightness(' + brightValue + '%)');
			$('#brightup > i').css('filter', 'brightness(' + brightValue + '%)');
			$('#brightdown > i').css('filter', 'brightness(' + brightValue + '%)');
      $('span#brightval').css('filter', 'brightness(' + brightValue + '%)');
			 $('span#brightval').text(brightValue + "%");        
    });
         socket.on('brightness clock value', function(brightclockchanger) {
         	// updateData(true, socket.brightchanger);
			var brightclockValue = (brightclockchanger);
			$('#display-multi-layout').css('filter', 'saturate(' + brightclockValue + '%)');

			// $('span#brightclockval').css('filter', 'blur(' + brightclockValue + 'px)');
			$('#brightclockup > i').css('filter', 'saturate(' + brightclockValue + '%)');
      $('#brightclockdown > i').css('filter', 'saturate(' + brightclockValue + '%)');
			 $('span#brightclockval').text(brightclockValue + "%");        
    });

}