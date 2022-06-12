module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        label_translate : {
            type : Sequelize.STRING,
            allowNull : false
        }
    },{
        timestamps: true,
        paranoid : true
    });    
    
    return Category;
}