const { Sequelize } = require('sequelize');

module.exports = new Sequelize('postgres://postgres:12345@localhost:5432/half-life-assignment');
