const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging:false, // disable logging or provide a custom logging function; default: console.log
   
  });


  const connectToDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      } 
  }
  
  module.exports = connectToDB;