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
        decide(res.pipe.bind(res, process.stdout));
    })
})