/**
 * Created by Dang Binh on 8/8/2014.
 */
var connect= require('connect');
var app = connect()
    .use(connect.cookieParser('tobi is a cool ferret'))
    .use(function(req, res){
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello');
    }).listen(3000);