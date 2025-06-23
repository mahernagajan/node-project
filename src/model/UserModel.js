const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');
const Menus=require("../model/MenusModel");
const User = sequelize.define(
    'users',
    {

        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        "firstName": {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        "lastName": {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        "softDelete": {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        "eMail": {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        "menuIds": {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        "password": {
            type: DataTypes.TEXT,
            allowNull:true,
            unique:true,
        },
        "fullName": {
            type: DataTypes.STRING,
        },
        "gender":{
            type:DataTypes.ENUM('MALE','FEMALE')
        }
    }
);

module.exports = User;