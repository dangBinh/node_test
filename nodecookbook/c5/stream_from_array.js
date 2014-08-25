/**
 * Created by Dang Binh on 8/22/2014.
 */
var stream = require('stream');
var util = require('util');

function StreamFromArray(store) {
    stream.Readable.call(this);
    this.store = store || [];
}

util.inherits(StreamFromArray, stream.Readable);
    StreamFromArray.prototype._read = function(size, encoding) {
    this.push(this.store.pop() || null);
}

module.exports = StreamFromArray;