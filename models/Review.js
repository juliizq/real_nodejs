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
        ratingGlobally :  {
            type : Sequelize.INTEGER,
            allowNull : false
        }, 
        ratingRealToSize :  {
            type : Sequelize.INTEGER,
            allowNull : false
        }, 
        ratingConfort :  {
            type : Sequelize.INTEGER,
            allowNull : false
        }, 
        ratingQuality :  {
            type : Sequelize.INTEGER,
            allowNull : false
        }, 
        size : {
            type: Sequelize.ENUM(
                'XXS',
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
                'XXXL'
            )
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