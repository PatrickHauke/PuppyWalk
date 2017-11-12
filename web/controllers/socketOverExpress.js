let io = require('socket.io'),
    http = require('http');

let server, socket, port, express;

exports.createSocketWithAppServer = (expressIn)=>{
    express = expressIn;
    port = expressIn.get('port');
    server = http.createServer(expressIn).listen(port, ()=>{
        console.log('\n\nExpress server listening on port %d in %s mode\n\n',
        port, expressIn.get('env'));
    });
    socket = io.listen(server, {'log level':1});
}

exports.expressApp = ()=>{return express;};
exports.server = ()=>{return server;};
exports.socket = ()=>{return socket;};
exports.port = ()=>{return port;};