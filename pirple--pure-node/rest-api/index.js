/**
 * Primary file
 */

// Dependencies
const http = require('http');
const url = require('url');

const PORT = 3000;

// The server should respons to all requests with a string
const server = http.createServer((req, res) => {
  // Get the url and parse it
  // https://developer.mozilla.org/en-US/docs/Web/API/URL
  const parsedUrl = url.parse(req.url, true);

  // get the path from url
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, '');

  // get http method
  const method = req.method.toLowerCase();

  // send the response
  res.end(`Hello world> ${method}:${trimedPath}`);

  //  log url to console
  console.log(`Request recieved on path> ${method}:${trimedPath}`);
});

// Start server and listen on port
server.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}`),
);
