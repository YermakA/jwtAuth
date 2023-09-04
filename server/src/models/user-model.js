const { DataTypes } = require('sequelize')
const sequelize = require("../database/createDB")

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activationLink: {
    type: DataTypes.STRING,
  }
});




module.exports = { User }