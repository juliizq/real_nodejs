const jwt = require('jsonwebtoken');
const { User } = require('../models');
const db = require('../models');
const { registerValidation, loginValidation } = require('../validations/auth.validations');
const saltRound = +process.env.SALT_ROUND || 10;
require('dotenv').config();

module.exports = {
    
    async handleRefreshToken(req,res){

        try {

            const cookies = req.cookies;

            if(!cookies.jwt){
                return res.status(401)
            }

            console.log(cookies.jwt);

            var refreshToken = cookies.jwt;


            const validation = loginValidation.validate(req.body);
            if(validation.error){
                return res.status(400).json(validation.error)
            }
            
            // Get user by email
            const user = await db.User.findOne({ where : { refreshToken : req.body.refreshToken}});

            // If not exist -> error 401 UNAUHTORIZE
            if(!user){
                return res.status(401).json({ error : 'UNAUTHORIZE'})
            }

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err || user.firstName != decoded.firstName) {
                        return res.status(403)
                    }

                    const accessToken = jwt.sign(
                        { "firstName" : decoded.firstName},
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn : '5m'}
                    );
                    res.json({ accessToken })
                }
            )

        } catch (err) {
            res.status(400).json(err)
        }
        
        return User;
       
    }
}