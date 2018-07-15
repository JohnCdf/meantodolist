const fs = require('fs');
const path = require('path');

var data = {};
/*
  The responsibilites of the data library is the manipulate or view data inside out .data folder
*/
data.create = function (directory, fileName, data, callback) {
  fs.open(path.join(__dirname+'/../.data/')+directory+'/'+fileName+'.json','wx',function(err, descriptor){
    if(!!err || !descriptor){
        callback(err)
    } else {
        fs.writeFile(descriptor, JSON.stringify(data), function(err){
            if(!!err){
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
    !!err ? callback(err) : callback(false, payload)
  })
}
data.update = function (directory, fileName, data, callback) {
    fs.open( path.join(__dirname + '/../.data/' + directory + '/' + fileName + '.json')  , 'r+', function (err, descriptor) {
        if (!!err) {
            callback (!!err)
        } else {
            fs.truncate(descriptor,function(err){
                if(err){
                    callback(!!err)
                }
                else {
                    fs.writeFile(descriptor, JSON.stringify(data) , function ( err ) {
                            if (!!err) {
                                callback (err)
                            } else {
                                callback (false)
                            }
                            fs.closeSync(descriptor);
                    });
                }
            })
        }
    })
}
data.delete = function (directory, fileName, data, callback) {
  fs.unlink(path.join(__dirname + '../data/.dta/' + directory + '/' + fileName + '.json'), (err) => {
    !! err ? callback(err) : callback(false)
  })
}
module.exports = data;
