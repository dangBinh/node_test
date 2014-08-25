/**
 * Created by Dang Binh on 8/20/2014.
 */
var http = require('http');
var url = require('url');
var profiles = require('./profiles');

http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    cb = urlObj.query.callback;
    who = urlObj.query.who;

    if(cb && who) {
        profile = cb + "(" + JSON.stringify(profiles[who]) + ")";
        res.end(profile);
    }
}).listen(8080);