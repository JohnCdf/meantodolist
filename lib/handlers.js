const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const lib = require('./data');
const helpers = require('./helpers');

handlers = {};

handlers.user = function (data, callback){
  let method = data.method.toLowerCase();
  let acceptableMethods = ["get","post", "put"];

  if ( acceptableMethods.indexOf(method) > -1 ) {
    handlers._user[method](data, callback)
  } else {
    callback (405, {message: "Unacceptable method"}, "application/json")
  }
}

  handlers._user = {}
  handlers._user.get = function (data, callback) {
    var username = typeof(data.headers.username) === 'string' ? data.headers.username : false;
    var password = typeof(data.headers.password) === 'string' ? data.headers.password : false;

    if( username && password ) {
      lib.read('users', username, function (err, stringPayload){
        if (err) {
          callback(404, {message: "This user does not exist."}, "application/json")
        } else {
            let payload = JSON.parse( stringPayload );

            if (helpers.hash(password) == payload.password) {
              callback(200, payload, "application/json")
            } else {
              callback(405, {message: "Incorrect password"}, "application/json")
            }
        }
      })
    } else {
      callback(405, {message: "Username & password are required"}, "application/json")
    }
  }
  handlers._user.post = function (data, callback) {
    let username = typeof(data.payload.username) === 'string' ? data.payload.username : false;
    let password = typeof(data.payload.password) === 'string' ? data.payload.password : false;

    if (username && password) {

      let userData = {
        username: username,
        password: helpers.hash(password),
        notes: []
      };  

      lib.create('users', username, userData, function(err) {
        err ? callback(405, {message: "User by the name " + username + " already exists"}, 'application/json') : callback(200, {message: 'Created user successfully √'}, 'application/json')
      })
    } else {
      callback (405, {message: "Username & password are required"}, "application/json")
    }
  }
  
  handlers._user.put = function (data, callback) {
    let username = typeof(data.payload.username) === 'string' ? data.payload.username : false;
    let password = typeof(data.payload.password) === 'string' ? data.payload.password : false;

    let notes = typeof(data.payload.notes) === 'string' ? data.payload.notes : false;
    let optionalPassword = typeof(data.payload.newPassword) === 'string' ? data.payload.newPassword : false;

    if (username && password) {

      lib.read('users', username, function (err, userData) {
        if (err) {
          callback(405, {message: "User does not exist. Create one, you boob"}, "application/json")
        } else {
          let userObj = JSON.parse(userData);
          if (userObj.password === helpers.hash(password)){

            let updatedUser = {
              username: username,
              password: helpers.hash(password),
              notes: notes
            }
      
            if (optionalPassword)   {
              updatedUser.password = helpers.hash(optionalPassword)
            }
            
            lib.update('users', username, updatedUser, function (err) {
              err ? callback(500, {message: "Could not update user. Sorry dweeb."}, "application/json") : callback(200, {message: "Changes have been saved"}, "application/json")
            })
          } else {
            callback(405, {message: "Incorrect password"}, "application/json")
          }
        }
      })

    } else {
      callback (405, {message: "Username & password are required"}, "application/json")
    }
  }
handlers.notfound = function (data, callback) {
  callback (404, {message: "Could not find"}, "application/json", "application/json")
}
module.exports = handlers;