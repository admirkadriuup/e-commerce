var http = require('http');
var fs = require('fs');

var server= http.createServer(function (req, resp) {
    if (req.method === "GET"){

        var path="test.html";
        
        fs.readFile(path , function (error, pgResp) {
           
                 if (error) {
                    resp.writeHead(404);
                    resp.write('Permbajtja nuk egziston!');
                    console.log('Error 404!')
                } else {
                    resp.writeHead(200, { 'Content-Type': 'text/html' });
                    resp.write(pgResp);
                }
            
        resp.end();
    });
} else if(req.method === "DELETE"){
        fs.unlink('test.html', function (err) {
        if(err)throw err;
        });
    }
}).listen(3000);
console.log('Punon ne portin 3000!');