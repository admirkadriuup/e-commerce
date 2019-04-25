var http = require('http');
var fs = require('fs');

var server= http.createServer(function (req, resp) {
    if (req.method === "GET"){
        fs.readFile("test.html", function (error, pgResp){
            if (error) {
                resp.writeHead(404);
                resp.write('404 File Not Found');
            }
            else {
                resp.writeHead(200, {'Content-Type': 'text/html'});
                resp.write(pgResp);
            }
            resp.end();
        });
}
    else if(req.method === "DELETE"){
        fs.unlink('test.html', function (err) {
            if (err) throw err;
            resp.write('test.html file is deleted!');
        });
    }

}).listen(3000);

console.log('Server running at port 3000');