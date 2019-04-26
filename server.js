var express = require('express');
var app = express();


app.get('/', function(req,res){
    res.end("E-commerce");
});

app.all('/date', function(req, res){
    res.end(Date());
});

app.get('/caclLength', function(req, res){
    res.end(req.query.word.length.toString());
});

app.listen(3000, function(){
    console.log("App listening on 3000")
});

app.use('/public',express.static('public')); // sherben files static