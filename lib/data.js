const fs = require('fs');
const path = require('path');

var data = {};
/*
  The responsibilites of the data library is the manipulate or view data inside out .data folder
*/
data.create = function (directory, fileName, content, callback) {
  fs.open(path.join(__dirname+'/../.data/')+directory+'/'+fileName+'.json','wx',function(err, descriptor){
    if(err || !descriptor){
        callback(err)
    } else {
        fs.writeFile(descriptor,JSON.stringify(data),function(err){
            if(err){
                callback(500)
            } else {
                callback(null,'Written to file');
                fs.closeSync(descriptor);
            }
        });
    }
});
}
data.read = function (directory, fileName, callback) {
  fs.readFile(path.join(__dirname+'/../.data/')+directory+'/'+fileName+'.json', 'utf-8' ,function(err, payload) {
    err ? callback(err) : callback(false, payload)
  })
}
data.update = function () {

}
data.delete = function () {

}
module.exports = data;