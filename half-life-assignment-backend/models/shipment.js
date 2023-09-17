const sequelizeInstance = require('./../database/sequelise-instance')
const { DataTypes } = require("sequelize");
const User = require('./user');

module.exports = sequelizeInstance.define('shipment', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    senderName: {
        type: DataTypes.STRING
    },
    senderAddress: {
        type: DataTypes.STRING
    },
    recipientName: {
        type: DataTypes.STRING
    },
    recipientAddress: {
        type: DataTypes.STRING
    },
    shipmentDescription: {
        type: DataTypes.STRING
    }
});
