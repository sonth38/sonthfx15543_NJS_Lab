const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '3893', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
