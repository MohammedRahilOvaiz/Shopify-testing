module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define('customer', {
        accessToken: {
            type: Sequelize.STRING
        },
        shop_url: {
            type: Sequelize.STRING
        }
    });

    return Shop;
}