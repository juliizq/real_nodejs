module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        email : {
            type: Sequelize.STRING,
            allowNull: false
        },
        password : {
            type : Sequelize.TEXT,
            allowNull: false
        },
        firstName :  {
            type : Sequelize.STRING,
            allowNull : false,
            field: 'first_name'
        }, 
        lastName : {
            type : Sequelize.STRING,
            allowNull : false,
            field: 'last_name'
        },
        role: {
            type: Sequelize.ENUM(
                'USER',
                'MODERATOR',
                'ADMIN'
            ),
            allowNull: false,
            defaultValue : 'USER'
        },
        refreshToken : {
            type : Sequelize.TEXT,
            allowNull : true
        }
    },{
        timestamps: true,
        paranoid : true
    });
    
    return User;
}