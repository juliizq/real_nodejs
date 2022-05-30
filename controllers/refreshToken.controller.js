const jwt = require('jsonwebtoken');
const { User } = require('../models');
const db = require('../models');
require('dotenv').config();


module.exports = {
    
    async handleRefreshToken(req,res){

        try {

            const cookies = req.cookies;

            if(!cookies?.jwt){
                return res.sendStatus(401)
            }

            const refreshToken = cookies.jwt;
            
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
                        return res.sendStatus(403)
                    }

                    const accessToken = jwt.sign(
                        {
                            'UserInfo': {
                                'userId': user.id,
                                'firstName': decoded.firstName,
                                'role': role
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn : '5m'}
                    );

                    res.json({ accessToken })
                }
            )

        } catch (err) {
            res.status(400).json(err)
        }  
    }
}