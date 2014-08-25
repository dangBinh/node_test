/**
 * Created by Dang Binh on 8/12/2014.
 */
var http = require('http'); // tao server htpp
var path = require('path'); // get path module
var url = require('url');
var pages = [
    {id: '1', route: '', output: ' Woohoo! '},
    {id: '2', route: 'about', output: 'A simple this'},
    {id: '3', route: 'another page', output: function(){
        return 'hello '+this.route;
    }}
];

var server = http.createServer(function(request, response){
    var id = url.parse(decodeURI(request.url), true).query.id;
    if(id) {
        pages.forEach(function(page){
            if(page.id == id) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(typeof page.output === 'function'
                    ? page.output() : page.output);
            }
        });
    }
    if(!response.finished) {
        response.writeHead(404);
        response.end('Page Not Found!');
    }
}).listen(8080)