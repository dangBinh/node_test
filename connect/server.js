/**
 * Created by Dang Binh on 8/8/2014.
 */
var connect = require('connect');
 console.log(connect);
var app = connect()
        .use(connect.bodyParser());
app.listen(3000);