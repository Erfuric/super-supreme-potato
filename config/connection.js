const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // For production environment (Heroku), use JawsDB connection
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    logging: false
  });
} else {
  // For development environment, use local MySQL connection
  sequelize = new Sequelize('devblog_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  });
}

module.exports = sequelize;