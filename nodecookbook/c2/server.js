/**
 * Created by Dang Binh on 8/15/2014.
 */
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var util = require('util');
var maxData = 2 * 1024 * 1024; //
var formidable = require('formidable');

var form = fs.readFileSync('form.html');

http.createServer(function(req, res) {
    if(req.method === "GET") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(form);
    }
//    if(req.method === "POST") {
//        var postData = '';
//        if(postData.length > maxData) {
//            postData = '';
//            this.destroy();
//            res.writeHead(413);
//            res.end("Too large");
//        }
//        req.on('data', function(chunk){
//            postData += chunk;
//        }).on('end', function() {
//            if(!postData) {res.end(); return;}
//            var postDataObject = querystring.parse(postData);
//            console.log('User Posted:\n' + postData);
//            res.end('You Posted:\n' + util.inspect(postDataObject));
//        })
//    }
    if(req.method === "POST") {
        var incoming = new formidable.IncomingForm();
        incoming.uploadDir = 'uploads';
        // fileBegin gia tri ban dau cua file luu duoi dang value/key
        incoming.on('fileBegin', function(name, file){
            if(file.name) {
                file.path = 'uploads/'+'-' + file.name;
            }
        }).on('file', function(field, file){
            if(!file.size) {return;}
            res.write(file.name + 'received \n');
        }).on('field', function(field, value){
            res.write(field + ':' + value + '\n');
        }).on('end', function(){
            res.end("All file received \n");
        });
        incoming.parse(req);
    }
}).listen(8080);

