var arDrone = require('..');
var http    = require('http');
var client  = arDrone.createClient();
client.disableEmergency();
console.log('Connecting png stream ...');
var pngStream = client.getPngStream();

// console.log("pngStream", pngStream)

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    // console.log("got some data", pngBuffer)
    lastPng = pngBuffer;
  });

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }
  console.log("REceived some data")

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});


client.takeoff();

setTimeout(() => { client.up(0.5)}, 0)
setTimeout(() => {client.stop(); client.front(0.3)}, 5000)
setTimeout(() => {client.stop()}, 7200)
setTimeout(() => {client.land()}, 8200)