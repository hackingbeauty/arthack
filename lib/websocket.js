function WebSocket(io){
  if(!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  }

  io.sockets.on('connection', function(socket){
    var allSockets = this;
    // socket.on means 'listen'
    socket.on('clientMessage', function(message){
      // socket.emit means 'send'
      console.log('client sent this data', message);
      allSockets.emit('serverResponse', message);
    });
  });
  
}

module.exports = WebSocket; 

