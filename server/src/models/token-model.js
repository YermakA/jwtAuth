const { DataTypes } = require('sequelize')
const sequelize = require("../database/createDB");
const { User } = require("./user-model");

const Token = sequelize.define('Token', {

  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = { Token }