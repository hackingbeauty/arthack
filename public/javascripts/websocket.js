ARTHACK.WebSocket = {
  id: Math.floor(100000 * Math.random()),
  url: 'ws://localhost:5000',
  // url: 'ws://http://morning-sunset-2703.herokuapp.com/,
  socket: null,
  init: function(){
    console.log('id',this.id);
    this.createWebSocket();
  },
  updateSocketStatus: function(message){
    document.getElementById('socket-status').innerHTML = message;
  },
  createWebSocket: function(){
    console.log('inside createWebSocket');
    this.socket = io.connect(this.url);
  }
}

ARTHACK.WebSocket.init();

