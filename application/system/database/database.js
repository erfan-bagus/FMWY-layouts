module.exports = {
  driver: function (driver_name, config) {
    if (driver_name === 'mysql') {
      var mysql = require('mysql');
      return mysql.createConnection({ host: config.host, user: config.user, password: config.password, port: config.port, database: config.database });
    } else if (driver_name === 'mongodb') {
      var mongoose = require('mongoose')
      return mongoose.connect('mongodb://' + config.host + ':' + config.port + '/' + config.database);
    }
  }
}
