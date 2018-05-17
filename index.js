const express = require('express');
const controller = require('./controllers/todoController');
const handlers = require('./lib/handlers');
const url = require('url');

const app = express();

let routes = {
  'api/user' : handlers.user
};
app.get('*', function ( request, response ) {
  var parsedUrl= url.parse(request.url, true);
    var path = parsedUrl.pathname,
    trimmedPath = path.replace(/^\/+|\/+$/g, '');

  let handler = typeof( routes[trimmedPath] ) == "function" ? routes[trimmedPath] : handlers.notfound;
  
  handler(request, function (statusCode, payload, contentType) {
    response.type(contentType);
    response.status(statusCode);

    contentType == 'application/json' ? payload = JSON.stringify(payload) : "go on";
    response.end(payload)
  })
})

app.set('port',(process.env.PORT || 3001));

if (process.env.NODE_ENV == 'production') {
  app.use( express.static('./client/build') )
}

controller(app);
app.listen(app.get('port'));