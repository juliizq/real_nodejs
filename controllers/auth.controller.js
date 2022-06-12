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
            res.status(500).json(err)
        }  
    },

    async logout(req,res){

        //FRONT END  EN EL CLIENT BORRAR TAMBIEN EL ACCESSTOKEN

        try {

            const cookies = req.cookies;

            if(!cookies?.jwt){
                return res.status(204) // Status : No content
            }

            const refreshToken = cookies.jwt;
            
            const user = await db.User.findOne({ where : { refreshToken : refreshToken}});

            // If not exist -> error 401 UNAUHTORIZE

            if (!user) {
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return res.sendStatus(204);
            }

            // Delete refreshToken in db
            
            user.refreshToken = null;
            const result = await user.save();

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.sendStatus(204);

        } catch (err) {
            return res.status(500).json(err)
        }  
    },

    async refreshToken(req,res){

        try {

            const cookies = req.cookies;

            if(!cookies?.jwt){
                return res.sendStatus(401)
            }

            const refreshToken = cookies.jwt;
            
            // Get user by email
            const user = await db.User.findOne({ where : { refreshToken }});

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
                                'role': user.role
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn : '5m'}
                    );

                    res.json({ accessToken, user })
                }
            )

        } catch (err) {
            console.log('err:', err)
            res.status(500).json(err)
        }  
    },

    async register(req,res){

        try {

            const validation = registerValidation.validate(req.body);
            if(validation.error){
                return res.sendStatus(400).json(validation.error)
            }

            const exist = await db.User.findOne({ where : { email : req.body.email}})

            if(exist){
                return res.sendStatus(400).json({ error : 'Email already exist!'})
            }
            
            const salt = bcrypt.genSaltSync(saltRound);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = {
                email : req.body.email,
                password : hash,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                role : req.body.role,
                country : req.body.country,
                city : req.body.city
            };
    
            const savedUser =  await db.User.create(user);
            res.json(savedUser);

        }catch (err){
            res.sendStatus(500).json(err)
        }
    }
}