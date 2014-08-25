/**
 * Created by Dang Binh on 8/7/2014.
 */
var connect = require('connect');
connect()
    .use(function hello(req, res) {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello world');
    })
.listen(3000);
// foo chua duoc dinh nghia tu sinh loi