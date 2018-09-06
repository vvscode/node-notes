/**
 * Primary file
 */

// Dependencies
const http = require('http');

const PORT = 3000;

// The server should respons to all requests with a string
const server = http.createServer((req, res) => {
  res.end('Hellow world');
});

// Start server and listen on port
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
