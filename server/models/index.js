const config = require('../config')
const Sequelize = require('sequelize');
// connect db
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  username:config.username,
  password:config.password,
  dialect: 'mysql',
})
module.exports = sequelize