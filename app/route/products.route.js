module.exports = function (app) {

    const products = require('../controller/products.controller');

    app.get('/api/products', products.findAll);

    app.get('/api/products/:product_id', products.findById);

    app.post('/api/products', products.create);

    app.get('/api/products/save', products.saveDB);

}