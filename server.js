var express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var productRoutes = require('./product.routes');
const ProductService = require('./product.service');

var app = express();

const handlebars = exphbs({ defaultLayout: "main" });
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // add HTTP body to req.body
app.use('/api/products', productRoutes);

app.get('/', function (req, res) {
    res.render("home");
});

app.get('/product/:id', async function (req, res) {
    try{
        const product = await ProductService.getById(req.params.id);
        res.render("product", product);
    }catch(err){
        res.send(err.message).end();
    }
});

app.listen(3000, function () {
    console.log("App listening on 3000")
});

app.use('/public/', express.static('public')); // sherben files static
