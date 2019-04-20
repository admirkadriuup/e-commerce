var http = require('http');
var url = require('url');


http.createServer(function (req, res){

   res.writeHead(200, {'Content-Type': 'text/html'});
 
   if(req.url ==="/hello"){
    res.end("Hello back")}

 
    else if(req.url ==="/date"){
    res.end("Hello back")}

 
    else{

    var query = url.parse(req.url, true).query;
    var word = query.word;
    var number = 0;
    var i = 0;
    while (i< word.length){
     i++;
     number++; 
    }
    res.end(number.toString());
    }
}).listen(3000);	