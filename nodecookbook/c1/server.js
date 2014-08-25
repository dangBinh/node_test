/**
 * Created by Dang Binh on 8/12/2014.
 */
var http = require('http'); // tao server htpp
var path = require('path'); // get path module

var pages = [
    {route: '', output: ' Woohoo! '},
    {route: 'about', output: 'A simple this'},
    {route: 'another page', output: function(){
        return 'hello '+this.route;
    }}
];

var server = http.createServer(function(request, response){
    var lookup = path.basename(decodeURI(request.url));
    pages.forEach(function(page){
        if(page.route == lookup) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(typeof page.output === 'function'
            ? page.output() : page.output);
        }
    });
    if(!response.finished) {
        response.writeHead(404);
        response.end('Page Not Found!');
    }
}).listen(8080);


