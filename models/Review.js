module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('Review', {
        comment : {
            type : Sequelize.TEXT,
            allowNull : false
        },
        // image : {
        //     type : Sequelize.???,
        //     allowNull : false
        // },
        rating :  {
            type : Sequelize.INTEGER,
            allowNull : false
        }, 
        weight : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        height : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    },{
        timestamps: true,
        paranoid : true
    });
    
    return Review;
}