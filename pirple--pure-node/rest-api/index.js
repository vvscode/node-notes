/**
 * Primary file
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const PORT = 3000;
const DEFAULT_STATUS_CODE = 200;

let router, handlers;

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
    const requestInfo = {
      method,
      path: trimedPath,
      query: queryStringObject,
      headers,
      payload: buffer,
    };

    // choose the handler for request
    // if one is not found - use notFounc hanlder
    const handler =
      trimedPath in router ? router[trimedPath] : handlers.notFound;

    handler(requestInfo, (status, payload) => {
      res.statusCode = status || DEFAULT_STATUS_CODE;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(payload || {}));

      //  log url to console
      console.log(
        `Request recieved on ${JSON.stringify(
          requestInfo,
        )} with ${JSON.stringify({ status, payload })}`,
      );
    });
  });
});

// Start server and listen on port
server.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}`),
);

handlers = {};
handlers.sample = (data, cb) => {
  // callback http status code and payload (object)
  cb(406, { name: `sample handler for ${JSON.stringify(data, null, 2)}` });
};

handlers.notFound = (data, cb) =>
  cb(404, {
    error: 'no handler for data',
    data,
  });

// Define request router
router = {
  sample: handlers.sample,
};
