module.exports = (sequelize, Sequelize) => {

    const Product = sequelize.define('product', {
        product_id: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        vendor: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        price: {
            type: Sequelize.FLOAT
        }
    });

    return Product;
}