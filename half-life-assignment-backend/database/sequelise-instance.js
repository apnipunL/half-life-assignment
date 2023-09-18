const { Sequelize } = require('sequelize');
const constants = require("./../const/constants");

module.exports = new Sequelize(constants.POSTGRES_CONNECTION_STRING);
