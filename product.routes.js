var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('list of products');
});

router.post('/', function (req, res) {
    res.send('created product');
});

router.get('/:id', function (req, res) {
    res.send('product ' + req.params.id);
});

router.delete('/:id', function (req, res) {
    res.send('product deleted ' + req.params.id);
});

router.put('/:id', function (req, res) {
    res.send('product updated ' + req.params.id);
});

module.exports = router;