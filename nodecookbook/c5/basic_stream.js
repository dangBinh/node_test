/**
 * Created by Dang Binh on 8/22/2014.
 */
var stream = require('stream');
var readable = new stream.Readable();
var writable = new stream.Writable();

var store = [];
writable._write = function (chunk, encoding, callback) {
    store.push(chunk);
    callback();
}
readable._read = function(size, encoiding){
    var mythis = this;
    setTimeout(function () {
        mythis.push(store.pop() || null);
    },2000)
//    this.push(store.pop() || null);
}

writable.write('fee');
writable.write('fo');
writable.write('fo');
writable.write('fum');

readable.on('data', function(data){
    console.log(data+"");
})