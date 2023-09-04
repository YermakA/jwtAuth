const { DataTypes } = require('sequelize')
const sequelize = require("../database/createDB");
const { User } = require("./user-model");

const Token = sequelize.define('Token', {

  id: {
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Token.hasOne(User, { foreignKey: 'id', foreignKeyConstraint: true })



module.exports = { Token }