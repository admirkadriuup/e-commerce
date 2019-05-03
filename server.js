var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

const handlebars = exphbs({defaultLayout: "main"});
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

app.get('/', function(req,res){
    res.render("home");
});

app.all('/product', function(req, res){
    res.render("product");
});

app.get('/caclLength', function(req, res){
    res.end(req.query.word.length.toString());
});

app.listen(3000, function(){
    console.log("App listening on 3000")
});

app.use('/',express.static('public')); // sherben files static