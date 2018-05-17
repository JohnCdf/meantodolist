const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const lib = require('./data');

handlers = {};

handlers.user = function (data, callback){
  let method = data.method.toLowerCase();

  let acceptableMethods = ["get","post"];
  if ( acceptableMethods.indexOf(method) > -1 ) {
    handlers._user[method](data, callback)
  } else {
    callback (405, {message: "Unacceptable method"}, "application/json")
  }
}

  handlers._user = {}
  handlers._user.get = function (data, callback) {
    var username = data.query.username;
    var password = data.query.password;

    lib.read('users', username, function (err,stringPayload){
      if (err) {
        callback(404, {message: "This user does not exist."}, "application/json")
      } else {
        let payload = JSON.parse( stringPayload );

        if (password == payload.password) {//Hash this password to authenticate
          delete payload.password
          callback(200, payload, "application/json")
        } else {
          callback(405, {message: "Incorrect password"}, "application/json")
        }
      }
      
    })
  }
  handlers._user.post = function (data, callback) {
    
    /*@TODO: 

    Make a user, with a hashed password

    */
  }

handlers.notfound = function (data, callback) {
  callback (404, {message: "Could not find"}, "application/json", "application/json")
}
module.exports = handlers;