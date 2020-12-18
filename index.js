const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = process.env.FORWARDING_ADDRESS; // Replace this with your HTTPS Forwarding address

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync with { force: true }');
});

require('./app/route/shopify.route.js')(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
