/**
 * Primary file
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

  // get the query string as an object
  const queryStringObject = parsedUrl.query;

  // get http method
  const method = req.method.toLowerCase();

  // get the headers as an object
  const headers = req.headers;

  // get the payload if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => (buffer += decoder.write(data)));
  req.on('end', () => {
    buffer += decoder.end();

    // common request information
    const requestInfo = JSON.stringify(
      {
        method,
        path: trimedPath,
        query: queryStringObject,
        headers,
        payload: buffer,
      },
      null,
      2,
    );

    // send the response
    res.end(`Hello world> ${requestInfo}`);

    //  log url to console
    console.log(`Request recieved on path> ${requestInfo})`);
  });
});

// Start server and listen on port
server.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}`),
);
