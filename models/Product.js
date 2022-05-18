module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        name : {
            type : Sequelize.TEXT,
            allowNull : false
        },
        shop : {
            type : Sequelize.TEXT,
            allowNull : false
        }
    },{
        timestamps: true,
        paranoid : true
    });    
    
    return Product;
}