/**
 * Created by Dang Binh on 8/8/2014.
 */
var http = require('http');

var req = http.require({
	method: 'POST', 
	port : 3000,
	headers : {
		'Content-Type' : 'application/json'
	}
})

req.write('[');
var n = 300000;
while(n--) {
	req.write('"foo",');
}
req.write('"bar"]');

req.end();