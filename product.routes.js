const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
const ProductService = require('./product.service');
const HTTPStatus = require('http-status');
const authMiddleware = require('./snipcartAuth.middleware');

router.get('/', async function (req, res) {
    const connection = await SqlProvider.getConnection();

    const result = await connection.query('SELECT * FROM `products`');
    const rows = result[0];

    return res.send(rows);
});

router.post('/', authMiddleware,
    async function (req, res) {

        const product = {
            name: req.body.name,
            price: req.body.price,
            weight: req.body.weight
        }

        const connection = await SqlProvider.getConnection();

        const result = await connection.query('INSERT INTO `products` SET ?', product);
        const insertedObject = result[0];

        if (insertedObject.affectedRows === 0) {
            return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
        }

        return res.send(HTTPStatus.OK).end();
    }
);

router.get('/:id', async function (req, res) {
    try {
        const product = await ProductService.getById(req.params.id);
        return res.send(product);
    } catch (err) {
        res.send(err.message).end();
    }
});

router.delete('/:id', async function (req, res) {
    if (isNaN(req.params.id)) {
        return res.send(HTTPStatus.BAD_REQUEST).end();
    }

    const connection = await SqlProvider.getConnection();

    const result = await connection.query('DELETE FROM `products` where id=?', req.params.id);
    const deletedObject = result[0];

    if (deletedObject.affectedRows === 0) {
        return res.send(HTTPStatus.NOT_FOUND).end();
    }

    return res.send(result);
});

router.put('/:id', authMiddleware, async function (req, res) {
    if (isNaN(req.params.id)) {
        return res.send(HTTPStatus.BAD_REQUEST).end();
    }

    const product = {}

    if (req.body.name) {
        product.name = req.body.name;
    }
    if (req.body.price) {
        product.price = req.body.price;
    }
    if (req.body.weight) {
        product.weight = req.body.weight;
    }

    const connection = await SqlProvider.getConnection();

    const result = await connection.query('UPDATE `products` SET ? where id=?', [product, req.params.id]);
    const udpatedObject = result[0];

    if (udpatedObject.affectedRows === 0) {
        return res.send(HTTPStatus.NOT_FOUND).end();
    }

    return res.send(HTTPStatus.OK).end();
});


router.post('/:id/photos', authMiddleware, async function (req, res) {
    if (isNaN(req.params.id) || !req.files.photo) {
        return res.send(HTTPStatus.BAD_REQUEST).end();
    }

    const url = './public/images/products/' + req.files.photo.name;
    req.files.photo.mv(url, async function (error) {
        if (error) {
            return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
        }
        const connection = await SqlProvider.getConnection();

        const result = await connection.query('UPDATE `products` SET ? where id=?', [
            {
                thumbnailUrl: url
            },
            req.params.id]);

        const udpatedObject = result[0];

        if (udpatedObject.affectedRows === 0) {
            return res.send(HTTPStatus.NOT_FOUND).end();
        }

        return res.send(HTTPStatus.OK).end();
    });
});

router.post('/webhook', async function (req, res) {
    if (req.body.eventName === "order.completed") {
        req.body.content.items.forEach(function(item){
            // increase item order count
        });
    }
    
    console.log(req.body);
    return res.sendStatus(HTTPStatus.OK).end();
});

module.exports = router;