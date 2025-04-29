const Sequelize  = require('sequelize');
const sequelize = require('../config/database');

const Term = require('./term')(sequelize);
const Product = require('./product')(sequelize);

const db = {
    sequelize,
    Sequelize ,
    Term,
    Product
}

module.exports = db;