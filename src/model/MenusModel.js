const sequelize = require('../config/db.config');
const { DataTypes, } = require('sequelize');
const User = require('./UserModel');

const Menus = sequelize.define(
    'Menus',
    {
        "MId": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        "MName": {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        "softDelete": {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }
);

User.hasMany(Menus, { as: 'menus', foreignKey: 'MId', sourceKey: "menuIds" });

module.exports = Menus;