
const http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) { 
    
    var txt;
    if (req.url == '/') { 

        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write('*** Mirsevini ***');
        res.end();
    
    }
    else if (req.url == "/hello") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(' Hello back! ');
        res.end();
    
    }
    else if (req.url == "/date") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Data dhe koha e tanishme eshte " + Date());
        res.end();
    
        } else{
            

            res.writeHead(200, {'Content-Type': 'text/html'});

            
            var q = url.parse(req.url, true).query;
            var txt = q.word ;
            

            res.end("Gjatesia e fjales "+ txt +" eshte " + txt.length );
    }

});
server.listen(3000); 

console.log('Web serveri eshte gati te pranoj kerkesa..')