
function refresh_module(refreshValue) {
         socket.on('refresh', function(refresher) {
         if (refresher == 1){
         	// console.log(refresher);
         	var sPath = window.location.pathname;
          var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

// console.log(sPath + '-----'+ sPage);
           if(sPath =="/views/mx1/index.html"){
           	location.reload();
           }
         }             
    });
}