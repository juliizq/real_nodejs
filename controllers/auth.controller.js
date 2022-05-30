const bcrypt = require('bcrypt');
const { object } = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const db = require('../models');
const { loginValidation } = require('../validations/auth.validations');

require('dotenv').config();

module.exports = {
    async login(req,res){

        try {

            const validation = loginValidation.validate(req.body);
            if(validation.error){
                return res.status(400).json(validation.error)
            }
            
            // Get user by email
            const user = await db.User.findOne({ where : { email : req.body.email}});

            // If not exist -> error 401 UNAUHTORIZE
            if(!user){
                return res.status(401).json({ error : 'UNAUTHORIZE'})
            }

            // Compare password hashed in database and password in req.body

            const isCorrect = bcrypt.compareSync(req.body.password, user.password);

            if(!isCorrect){
                return res.status(401).json({ error : 'UNAUTHORIZE'})
            }

            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        'userId': user.id,
                        'firstName': user.firstName,
                        'role': user.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );

            const refreshToken = jwt.sign(
                { userId : user.id, firstName: user.firstName }, 
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '1d'}
            );

            // Saving refresh token
            await db.User.update({refreshToken}, {where : {id : user.id}});

            res.cookie('jwt', refreshToken, {httpOnly : true, maxAge : 24 * 60 * 60 * 1000});

            res.json({user, accessToken});

        } catch (err) {
            res.status(400).json(err)
        }  
    }
}