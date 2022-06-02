const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Order = sequelize.define('oder', {
    id : {
        type : Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = Order