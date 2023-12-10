// Required modules
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('5555555555555555555555555555555');
});

// Define the port
const port = process.env.PORT || 3333;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

