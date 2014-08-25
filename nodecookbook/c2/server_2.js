/**
 * Created by Dang Binh on 8/19/2014.
 */
var http = require('http');
var fs = require('fs');

var options = {};
options.file = '50meg';
options.fileSize = fs.statSync(options.file).size;
options.kps = 32;

http.createServer(function(req, res) {
    var download = Object.create(options);
    download.chunks = new Buffer(download.fileSize);
    download.bufferOffset = 0;

    res.writeHeader(200, {'Content-Length': options.fileSize});

    fs.createReadStream(options.file)
        .on('data', function(chunk){
            chunk.copy(download.chunks, download.bufferOffset);
            download.bufferOffset += chunk.length;
        })
        .once('open', function(){
            // something else
            var handleAbort = throttle(download, function(send) {
                console.log(send);
                res.write(send);
            })
            req.on('close', function(){
                handleAbort();
            });
        });
}).listen(8080);

function throttle(download, cb){
    var chunkOutSize = download.kps * 1024, timer = 0 ;
    (function loop(bytesSent){
        var remainingOffset;
        if(!download.aborted) {
            setTimeout(function() {
                var bytesOut = chunk.length + bytesSent;
                if(download.bufferOffset > bytesOut) {
                    timer = 1000;
                    cb(download.chunks.slice(bytesSent, bytesOut));
                    loop(bytesOut);
                    return;
                }

                if(bytesOut >= download.chunks.length) {
                    remainingOffset = download.chunks.length - bytesSent;
                    cb(download.chunk.slice(remainingOffset, bytesSent));
                    return;
                }
            }, timer);
        }
    },(0));
    return function() {
        download.aborted = true;
    }
}
