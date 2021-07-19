const http = require('http');
const path = require('path');
const fs = require('fs');

function handleRequest(request, respone) {
  // What did we request?
  let pathname = request.url;
  
  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }
  
  // Ok what's our file extension
  let ext = path.extname(pathname);

  // Map extension to file type
  const typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  let contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        respone.writeHead(500);
        return respone.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      respone.writeHead(200,{ 'Content-Type': contentType });
      respone.end(data);
    }
  );
}


// Create a server with the handleRequest callback
let server = http.createServer(handleRequest);
server.listen(8080);
// Listen on port 8080
let io = require('socket.io')(server);
io.listen(server); //開啟socket.io的listener

console.log('Server started on port 8080');

io.on('connection', function (socket) {
    console.log("We have a new client: " + socket.id);

    socket.on('disconnect', function() {
        console.log("Client has disconnected");
    });

    socket.on('mouse',function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
      }
    );


});