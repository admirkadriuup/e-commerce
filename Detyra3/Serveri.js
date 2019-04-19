var http = require('http'); 
var url = require('url');

var server = http.createServer(function (req, res) {  
    if (req.url == '/hello') { 
        
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        

        res.write('<html><body><p>Hello back.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/date") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Date: " +Date());
        res.end();
    }
	else{
            res.writeHead(200, {'Content-Type': 'text/html'});

            var gjatesia = url.parse(req.url, true).query;
            var txt = gjatesia.word ;
            

            res.end("The length of word: '"+ txt +"' is: " + txt.length );
    }
}).listen(3000);
    console.log('Node.js web server at port 3000 is running..')