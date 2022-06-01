const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const CartItem = sequelize.define('CartItem', {
    id : {
        type : Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem