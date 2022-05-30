const db = require('../models');
const bcrypt = require('bcrypt');
const { exist } = require('joi');
const { createUser, updateUser } = require('../validations/user.validation');
const { User } = require('../models');
const req = require('express/lib/request');
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
                return res.sendStatus(400).json(validation.error)
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

    async update (req, res) {
        try {
            const id = req.params.id;
      
            const exist = await db.User.findOne({ where : { id : id }});

            if(!exist){
              return res.status(404).json('Not found');
            }

            const validation = updateUser.validate(req.body);
            if(validation.error){
                return res.status(400).json(validation.error)
            }

            const user = Object.assign(exist,req.body);
            await user.save();
      
            return res.status(200).json(user);

        }catch(error){

            console.log('error:', error)
            if(error.name === 'ValidationError'){
              return res.status(400).json({errors : error.details});
            }
            return res.status(500).json('Something wrong happened');
        }
        
    },

    async delete(req,res){
        try {
            const id = req.params.id;

            const exist = await db.User.findOne({ where : { id : id }});
            if(!exist){
                return res.status(404).json({ error : 'Not found'});
            }

            await exist.destroy();

            return res.status(200).json({ meessage : 'User deleted!'});
        } catch (err) {
            console.log('err:', err)
            return res.status(500).json('Something wrong happened');
        }
    }

} 