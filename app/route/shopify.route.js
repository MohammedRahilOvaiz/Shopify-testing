module.exports = function (app) {

    const shopify = require('../controller/shopify.controller');

    app.get('/shopify', shopify.install);

    app.get('/shopify/callback', shopify.callback);
    
    const products = require('../controller/products.controller');

    app.get('/api/products', products.findAll);

    app.get('/api/products/:product_id', products.findById);

    app.post('/api/products', products.create);

    app.get('/api/products/fromdb', products.findAllDB);
}