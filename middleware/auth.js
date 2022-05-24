const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async auth(req, res, next){
        try{
            const authorization = req.headers.authorization;
            if(!authorization){
                return res.status(401).json({ error : 'UNAUTHORIZE'});
            }

            console.log(authorization);
    
            const token = authorization.split(' ')[1];

            if(!token){
                return res.status(401).json({ error : 'UNAUTHORIZE'});
            }
    
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await db.User.findOne({ where : { id : decoded.userId }});

            if(!user){
                return res.status(401).json({ error : 'UNAUTHORIZE'});
            }

            req.user = user;
            next();
            
        }catch(err){
            return res.status(400).json(err);
        }
    },
    
    async authAdmin(req, res, next){
        try{
            const authorization = req.headers.authorization;
            if(!authorization){
                return res.status(401).json({ error : 'UNAUTHORIZE'});
            }
    
            const token = authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({ error : 'UNAUTHORIZE'});
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await db.User.findOne({ where : { id : decoded.userId }});

            if(!user || user.role != 'ADMIN'){
                return res.status(401).json({ error : 'UNAUTHORIZE'});
            }

            req.user = user;
            next();
        }catch(err){
            return res.status(400).json(err);
        }
    }
};