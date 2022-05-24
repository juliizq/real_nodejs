const db = require('../models');
const bcrypt = require('bcrypt');
const { exist } = require('joi');
const { createUser} = require('../validations/user.validation');
const saltRound  = +process.env.SALT_ROUND || 10;


module.exports = {

    getAll(req, res){
        return db.User.findAll()
            .then((data) => {
                res.json(data)
            }).catch((err) =>{
                res.status(400).json(err)
            })
    },

    async create(req,res){

        try{

            const validation = createUser.validate(req.body);

            if(validation.error){
                return res.status(400).json(validation.error)
            }

            const exist = await db.User.findOne({ where : { email : req.body.email}})

            if(exist){
                return res.status(400).json({ error : 'User already exist.'})
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
            res.status(201).json(savedUser)

          }catch(error){
            if(error.name === 'ValidationError'){
              return res.status(400).json({errors : error.details});
            }
            return res.status(500).json({'message' : error.message});
          } 
    },


}