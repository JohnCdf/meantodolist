const express = require('express');
const controller = require('./controllers/todoController');
const handlers = require('./lib/handlers');
const helpers = require('./lib/helpers');
const url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var decoder = new stringDecoder('utf-8');

const app = express();

let routes = {
  'api/user' : handlers.user
};

app.all('*', function ( request, response ) {
  var parsedUrl= url.parse(request.url, true);
    var path = parsedUrl.pathname,
    trimmedPath = path.replace(/^\/+|\/+$/g, '');
    
    let buffer = '';
    let handler = typeof( routes[trimmedPath] ) === "function" ? routes[trimmedPath] : handlers.notfound;
    
    request.on('data', function (data) {
      buffer += decoder.write(data)
    })
    request.on('end', function (data) {
      buffer += decoder.end()
      
      var data = {
        'headers' : request.headers,
        'path' : trimmedPath,
        'payload' : helpers.jsonToObj(buffer),
        'query' : parsedUrl.query,
        'method' : request.method.toLowerCase()
      };

      handler(data, function (statusCode, payload, contentType) {
        !contentType ? contentType = "text/plain" : true;
        contentType == 'application/json' ? payload = JSON.stringify(payload) : true;
    
        response.type(contentType);
        response.status(statusCode);
    
        response.end(payload)
      })
    })
})

app.set('port',(process.env.PORT || 3001));

if (process.env.NODE_ENV == 'production') {
  app.use( express.static('./client/build') )
}

controller(app);
app.listen(app.get('port'));