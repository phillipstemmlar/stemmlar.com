const PORT = 8081; 
const HOSTNAME = '127.0.0.1';
var http = require('http');
var fs = require('fs')
var server;

fs.readFile('../index.html',(err,html) => {
	if(err) throw err;
	server = http.createServer((req,res) => {
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(html);
		res.end();
	});
	server.listen(PORT, HOSTNAME, () => {
		console.log('Server running at http://${HOSTNAME}:${PORT}/');
	});
})

