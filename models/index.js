require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./User')
const productModel = require('./Product')
const reviewModel = require('./Review')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  { 
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
})

const db  = {
  Sequelize : Sequelize,
  sequelize : sequelize,
  User : userModel(sequelize, DataTypes),
  Product : productModel(sequelize, DataTypes),
  Review : reviewModel(sequelize, DataTypes)
}

//Relaciones

// One to many

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

// One to many

db.Product.hasMany(db.Review);
db.Review.belongsTo(db.Product);


db.sequelize.sync({ alter : true}).then(()=>{
  console.log('*** All models sync with DB ***');
}).catch((error)=>{
  console.log('error:', error)

}) 

module.exports = db;



