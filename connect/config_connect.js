var connect = require('connect');
var app = connect();
    app.use(logger(':method :url'))
       .use(hello);
app.listen(3000);
function setup(format) {
    var rexexp = /:(\w+)/g;
    return function logger(req, res, next) {
        var str = req.replace(rexexp, function(match, property){
            return req[property];
        })
        console.log(str);
        next();
    }
}
module.exports = setup;

