/**
 * Created by Dang Binh on 8/12/2014.
 */
var http = require('http'); // tao server htpp
var path = require('path'); // get path module
var url = require('url'); // get url module
var fs = require('fs'); // get fs module

var mimeType = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};


var cache = {};

function cacheAndDeliver(f, cb) {
    // rest of Deliver
//    if(!cache[f]) {
//        fs.readFile(f, function(err, data){
//            if(!err) {
//                cache[f] = {content : data, timestamp: Date.now()};
//            }
//            cb(err, data);
//        });
//        return;
//    }
    fs.stat(f, function (err, stats){
        if(err) {console.log("error");}
        var lastChanged = Date.parse(stats.ctime);
        isUpdated = (cache[f]) && lastChanged > cache[f].timestamp;
        if(!cache[f] || isUpdated) {
            fs.readFile(f, function(err, data){
                if(!err) {
                    cache[f] = {content : data, timestamp: Date.now()};
                }
                console.log("loading " + f + " from cache");
                cb(err, data);
            });
            return;
        }
        cb(null, cache[f].content);
    })
}

var server = http.createServer(function(request, response){
    var lookup = path.basename(decodeURI(request.url)) || 'index.html';
    console.log(lookup);
    var f = 'content/' + lookup

    var s = fs.createReadStream(f).once('open',function(){

    }).once('error', function(e){
        console.log(e);
        response.write
    })

    fs.exists(f, function(exists){
//        console.log((exists) ? lookup + " is there" : lookup + " doesn't exist");
        if(exists) {
            cacheAndDeliver(f, function(err, data){
                if(err) {
                    response.writeHead(500);
                    response.end('Server Error');
                    return;
                }
                var header = {'Content-Type': mimeType[path.extname(lookup)]}
                response.writeHead(200, header);
                response.end(data);
            })
            return;
        }
        response.writeHead(404);
        response.end();
    })
}).listen(8080)