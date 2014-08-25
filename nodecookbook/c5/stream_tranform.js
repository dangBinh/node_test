/**
 * Created by Dang Binh on 8/22/2014.
 */
var stream = require('stream');
var transformable = new stream.Transform();

transformable._transform = function(chunk, encoding, callback) {
    transformable.push(chunk.toString().toUpperCase());
    callback();
}

transformable.write('fee');
transformable.write('fi');
transformable.write('fo');
transformable.write('fum');
process.stdin.pipe(transformable).pipe(process.stdout);