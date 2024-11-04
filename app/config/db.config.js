

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Employee = require('../models/employee.model.js')(sequelize, Sequelize);
db.Product = require('../models/product.model.js')(sequelize, Sequelize);
db.Branch = require('../models/branch.model.js')(sequelize, Sequelize);
db.Book = require('../models/books.model.js')(sequelize, Sequelize)
db.Prestamo = require('../models/prestamo.model.js')(sequelize, Sequelize)
db.Catedratico = require('../models/catedratico.model.js')(sequelize, Sequelize);
db.Horario = require('../models/horario.model.js')(sequelize, Sequelize);
db.Ingreso = require('../models/ingreso.model.js')(sequelize, Sequelize);

module.exports = db;