const { timeStamp } = require('node:console');
const sequelize = require('../config/db.config');
const { DataTypes, } = require('sequelize');
const User = require("../model/UserModel");

const Session = sequelize.define(
    'session',
    {
        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        "userId": {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        "loginDate": {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        "logoutDate": {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        "active": {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        "softDelete": {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }
);

Session.belongsTo(User, { foreignKey: 'userId' });

module.exports = Session;