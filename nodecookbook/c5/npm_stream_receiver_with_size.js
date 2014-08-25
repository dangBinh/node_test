/**
 * Created by Dang Binh on 8/22/2014.
 */
var http = require('http');
var feed  = 'http://isaacs.iriscouch.com/registry/_changes?feed=continuous', ready = false;
function decide(cb) {
    console.log("decided");
    setTimeout(function(){
        if(Date.now()%2) {return console.log("rejected")};
        ready = true;
        cb();
    })
}

http.get(feed, function (res){
    res.on('readable', function log(){
        if(!ready) {return decide(log);}

        (function output(){
            var chunk = res.read(20);
            if(chunk == null) {return;}
            console.log(chunk+'');
            setImmediate(output());
        }());
        console.log(res.read()+'');
    })
})