/**
 * Created by Dang Binh on 8/20/2014.
 */
var profiles = require('./profiles');
var xml2js = require('xml2js');

var builder = new xml2js.Builder({rootName: 'profiles'});
profiles = builder.buildObject(profiles); // change to XML
//profiles = JSON.stringify(profiles).replace(/name/g, 'fullname');
profiles = profiles.replace(/name/g, 'fullname');

//profiles = JSON.parse(profiles);
//profiles.felix.fullname = "Felix dmm";
console.log(profiles);
// change to obj
xml2js.parseString(profiles, {
    explicitArray: false,
    explicitRoot: false
}, function(err, obj){
    if(err) throw err;
    profiles = obj;
    profiles.felix.fullname = "FELIX";
    console.log(profiles);
})
