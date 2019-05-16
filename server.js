var express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var productRoutes = require('./product.routes');
var app = express();

const handlebars = exphbs({ defaultLayout: "main" });
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // add HTTP body to req.body
app.use('/api/products', productRoutes);

app.get('/', function (req, res) {
    res.render("home");
});

app.get('/product', function (req, res) {
    res.render("product");
});

app.listen(3000, function () {
    console.log("App listening on 3000")
});

app.use('/public/', express.static('public')); // sherben files static
