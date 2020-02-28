var express = require('express');

var PORT = process.env.PORT || 8081; 
var HOSTNAME = '127.0.0.1';

var app = express();

app.get('/', function (req, res) {res.sendFile(__dirname + '/index.html');});
app.get('/img/*', (req, res) => { res.sendFile(__dirname + req.url); });
app.get('/css/*', (req, res) => { res.sendFile(__dirname + req.url); });
app.get('*', (req, res) => { res.render(__dirname + '/404notfound.html'); });

app.listen(PORT, function () {
	console.log('Server running at http://' + HOSTNAME + ':' + PORT + '/');
});
