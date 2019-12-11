var express = require('express');

var PORT = process.env.PORT || 8081; 
var HOSTNAME = '127.0.0.1';

var app = express();

app.get('/', function (req, res) {
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write("TESTING TESTING TESTING === JJJJJJJJJJJJJJJJJJJAAAAAAAAAAAAAAAAAAAAAA");
	res.send();
});

app.listen(PORT, function () {
	console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
});