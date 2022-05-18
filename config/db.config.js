const Sequelize = require('sequelize');

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Recuperar los modelos 
// Ejemplos >
db.user = require('../model/user.model.js')(sequelize, Sequelize);
// db.role = require('../model/role.model.js')(sequelize, Sequelize);

//Relaciones entre modelos
 
// db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
// db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

module.exports = db;