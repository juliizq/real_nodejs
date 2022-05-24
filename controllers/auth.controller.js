const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const db = require('../models');
const { registerValidation, loginValidation } = require('../validations/auth.validations');
const saltRound = +process.env.SALT_ROUND || 10;
require('dotenv').config();

module.exports = {
    async register(req,res){

        try {

            const validation = registerValidation.validate(req.body);
            if(validation.error){
                return res.status(400).json(validation.error)
            }

            const exist = await db.User.findOne({ where : { email : req.body.email}})

            if(exist){
                return res.status(400).json({ error : 'Email already exist!'})
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
            res.status(400).json(err)
        }
    },
    
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
                { userId : user.id, firstName: user.firstName }, 
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '10m'}
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