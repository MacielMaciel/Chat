// Import the ws module as a variable called WebSocketServer.
var WebSocketServer = require("ws").Server;


var wss = new WebSocketServer({port: 7007});


console.log("Server is Running...");


wss.broadcast = function broadcastMsg(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};


wss.on('connection', function connection(ws) {

    var remoteIp = ws.upgradeReq.connection.remoteAddress;

 
    console.log('Connection received: ', remoteIp);

    ws.on('message', wss.broadcast);
});
