ARTHACK.GeoLocation = {
  geolocation: null,
  init: function(){
    this.loadGeoLocation();
  },
  updateGeoLocationStatus: function(message){
    document.getElementById('geolocation-status').innerHTML = message;
  },
  updateCoordinates: function(message){
    document.getElementById('geolocation-coordinates').innerHTML = message;
  },
  updateLocation: function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var timestamp = position.timestamp;
    ARTHACK.GeoLocation.updateGeoLocationStatus('Location updated at ' + timestamp);
    ARTHACK.GeoLocation.updateCoordinates('latitude: ' + timestamp + 
    ' longitude: ' + longitude);
    
    var toSend = JSON.stringify([ARTHACK.WebSocket.id,
                                 latitude,
                                 longitude]);
    console.log('will be sending this data',toSend);
    ARTHACK.GeoLocation.sendMyLocation(toSend);
  },
  sendMyLocation: function(newLocation){
    var socket = ARTHACK.WebSocket.socket;
    if(socket){
      socket.emit('clientMessage',newLocation); // socket.emit means 'send'      
      socket.on('serverResponse', function(data){ //socket.on means 'listen'
        console.log('the server resonded with:', data);
      });
    }
    console.log('new location is ',newLocation);
  },
  handleLocationErrors: function(error){
    var self = ARTHACK.GeoLocation;
    switch(error.code)
    {
      case 0:
        self.updateGeoLocationStatus('There was an error retrieving your location: ' +
                                    error.message);
        break;
      case 1:
        self.updateGeoLocationStatus('The user prevented this page from retrieving a location.');
        break;
      case 2:
        self.updateGeoLocationStatus('The browser was unable to determine your location: ' + 
                                    error.message);
      case 3:
        this.updateGeoLocationStatus('The browser timed out before retrieving the location');
    }
  },
  loadGeoLocation: function(){
    var self = this;
    console.log('inside loadGeoLocation');
    if(navigator.geolocation){
      this.geolocation = navigator.geolocation;
      this.updateGeoLocationStatus('HTML5 Gelocation is supportted in your browser');    
      this.geolocation.watchPosition(self.updateLocation,
                                     self.handleLocationErrors,
                                     {maximumAge:20000});
    }
  }
}

ARTHACK.GeoLocation.init();
