const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.HOST,
  dialect: 'postgres',
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: "jwtdblesson",

});


const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


checkConnection()

module.exports = sequelize 