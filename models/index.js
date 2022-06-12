require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./User')
const productModel = require('./Product')
const reviewModel = require('./Review')
const categoryModel = require('./Category')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,  { 
  host: process.env.DB_HOST,
 port : process.env.DB_PORT,
  dialect: "mysql",
  logging: false
})

const db  = {
  Sequelize : Sequelize,
  sequelize : sequelize,
  User : userModel(sequelize, DataTypes),
  Product : productModel(sequelize, DataTypes),
  Review : reviewModel(sequelize, DataTypes),
  Category : categoryModel(sequelize, DataTypes)
}

//Associations

// One to many

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

// One to many

db.Product.hasMany(db.Review);
db.Review.belongsTo(db.Product);

//One to many

db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);


db.sequelize.sync({ alter : true}).then(()=>{
  console.log('*** All models sync with DB ***');
}).catch((error)=>{
  console.log('error:', error)

}) 

module.exports = db;



