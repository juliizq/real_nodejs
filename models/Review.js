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
            allowNull : false,
            field: 'first_name'
        }, 
        weight : {
            type : Sequelize.STRING
        },
        height : {
            type : Sequelize.STRING
        },
    },{
        timestamps: true,
        paranoid : true
    });
    
    return Review;
}