// Run this to receive a png image stream from your drone.

var arDrone = require('..');
var http    = require('http');
var https    = require('https');
var querystring = require('querystring');

console.log('Connecting png stream ...');

var pngStream = arDrone.createClient().getPngStream();

var options = {
  // hostname: 'www.google.com',
  method: 'POST',
  localAddress: '172.25.5.32',
  headers: {'Content-Type': 'image/png'}
};

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }
  console.log("about to request")
  const url = 'https://sxzbd6hos9.execute-api.eu-west-1.amazonaws.com/dev/hello'
  const lambdaReq = https.request(url, options, function(res) {
    // res.on('data', function (chunk) {
    //   console.log(chunk.toString());
    // });
    console.log('sent image')
  });
  const postData = querystring.stringify({
    'msg': 'Hello Benja!'
  });
  // lambdaReq.write()
  lambdaReq.end();
  // lambdaReq.writeHead(200, {'Content-Type': 'image/png'});
  // lambdaReq.end(lastPng);

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');
});






