/**
 * Created by Dang Binh on 8/8/2014.
 */
var connect = require('connect');

var app = connect()
        .use(connect.logger())
        .use(hello)
        .listen(3000);
