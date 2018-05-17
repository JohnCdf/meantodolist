const crypto = require('crypto');
const config = require('../config');

var helpers = {};

helpers.hash = function (string) {
  if(typeof(string)=='string' && string.trim().length > 0){
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(string).digest('hex');
    return hash
  } else {
    throw err
  }
};

helpers.jsonToObj = function (json) {
  try {
    let obj = JSON.parse(json)
    return obj
  } catch (error) {
    return {}
  }
}
module.exports = helpers