var arDrone = require('..');
var client  = arDrone.createClient();
client.disableEmergency();

client.takeoff();

client
  .after(2000, function() {
    this.animate('flipLeft', 1000);
    // this.animateLeds('blinkOrange', 5, 2)
  })
  .after(3000, function() {
    this.stop();
    this.land();
  }); 