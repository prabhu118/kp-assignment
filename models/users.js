'use strict';

const {DataTypes, Model} = require('sequelize');
const sequelizeCon = require('../config/dbConnection');

class User extends Model {};

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    address: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null
    },
    additional_info: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: null
    }
}, {
    sequelizeCon,
    modelName: 'users',
    timestamps: false
});

module.exports = User;