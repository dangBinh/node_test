var qs = require('querystring');

exports.sendHtml = function(res, html) {
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}

exports.parseReceivedData = function(req, cb){
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk){body +=chunk});
	req.on('end', function() {
		var data = qs.parse(body);
		cb(data);
	})
}

exports.actionForm = function(id, path, lable) {
	var html = '<form method="POST" action="' + path + '">' +
	'<input type="hidden" name="id" value="' + id + '">' +
	'<input type="submit" value="' + label + '" />' +
	'</form>';
	return html;
}
