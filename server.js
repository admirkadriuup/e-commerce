var express = require('express');
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var productRoutes = require('./product.routes');

var app = express();

const handlebars = exphbs({ defaultLayout: "main" });
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'e-commerce'
});

con.connect(function (err) {
    if (err) {
        throw err;
    }

    console.log("Connected!");

    startApp();
});

function startApp() {
    app.use('/api/products', productRoutes);

    app.get('/', function (req, res) {
        res.render("home");
    });

    app.all('/product', function (req, res) {
        res.render("product");
    });

    app.get('/product-list', function (req, res) {
        con.query("SELECT * FROM products", function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    });

    app.listen(3000, function () {
        console.log("App listening on 3000")
    });

    app.use('/', express.static('public')); // sherben files static
}
