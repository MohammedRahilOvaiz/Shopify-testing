shop = process.env.SHOPIFY_SHOP_URL;
accessToken = process.env.MY_ACCESS_TOKEN;
const db = require('../config/db.config.js');
const Product = db.products;
const Customer = db.customers;

const request = require('request-promise');

// FETCH all Customers
exports.findAllDB = (req, res) => {
    console.log('phase 1');
    Customer.findAll().then(customers => {
        // Send all customers to Client
        res.send(customers);
    });
};

exports.create = (req, res) => {

}

exports.findById = (req, res) => {

}

exports.findAll = (req, res) => {
    const shopRequestUrl = `https://${shop}/admin/api/2020-10/products.json`;

    accessToken = process.env.MY_ACCESS_TOKEN;
    if (accessToken != 0) {
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': accessToken,
        };
        request.get(shopRequestUrl, { headers: shopRequestHeaders })
            .then((shopResponse) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).end(shopResponse);
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    } else {
        res.end('Error');
    }
}

exports.saveDB = (req, res) => {
    const shopRequestUrl = `https://${shop}/admin/api/2020-10/products.json`;
    if (accessToken != 0) {
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': accessToken,
        };
        request.get(shopRequestUrl, { headers: shopRequestHeaders })
            .then((shopResponse) => {
                products = shopResponse.products;
                products.forEach(function (product) {
                    product.variants.forEach(function (variant) {
                        Product.create({
                            product_id: product.id,
                            title: product.title,
                            vendor: product.vendor,
                            id: variant.id,
                            price: variant.price
                        }).then(product => {
                            // Send created customer to client
                            res.send(product);
                        });
                    });
                });
                res.status(200).end("success!");
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    } else {
        res.end('Error');
    }
}

