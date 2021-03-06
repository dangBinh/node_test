/**
 * Created by Dang Binh on 8/20/2014.
 */
//var profiles = require('./profiles_enchanced');
var xml2js = require('xml2js');

var builder = new xml2js.Builder({rootName: 'profiles'});
var profiles = {
    normal: builder.buildObject(require('./profiles')),
    enchanced: builder.buildObject(require('./profiles_enchanced'))
};

function apply(options, fn){
    return function(xml, cb) {
        return fn(xml, options, cb);
    }
}

var parseString = apply({
    explicitArray: false,
    explicitRoot: false
}, xml2js.parseString);

parseString(profiles.normal, console.log);
parseString(profiles.enchanced, console.log);
