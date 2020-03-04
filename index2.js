var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  if (req.url === '/secret_key') {
    res.write(`<h3>${req.url}</h3>`);
  } else {
    res.write('Nooo');  
  }
  res.end(); 
}).listen(9000); 