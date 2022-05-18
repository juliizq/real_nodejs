module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        username : {
            type : Sequelize.TEXT,
            allowNull : false,
            unique : true
        },
        password : {
            type : Sequelize.TEXT,
            allowNull : false
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
                'ADMIN'
            ),
            allowNull: false,
            defaultValue : 'USER'
        },
        country : {
            type : Sequelize.STRING,
            allowNull : false,
        },
        city : {
            type : Sequelize.STRING,
            allowNull : false,
        }
    },{
        timestamps: true,
        paranoid : true
    });
    
    return User;
}