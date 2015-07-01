
var httpport = 65000;
var actions = require("../actionFunction/actions.js");
function startServers(){
	app = require("express")();
	httpServer = app.listen(httpport,function(){
		console.log("http server start up .....");
	});

	app.get("/getversionfile",function(request,response){
		actions.sendVersionFile(request, response)	
	});
}
exports.startServers = startServers;
