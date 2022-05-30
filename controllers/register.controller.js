const { User } = require('../models');
const db = require('../models');
const { registerValidation } = require('../validations/auth.validations');
require('dotenv').config();

module.exports = {
    
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
            res.sendStatus(400).json(err)
        }
    }

}