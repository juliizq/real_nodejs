const db = require('../models');

module.exports = {
    getAll(req,res){
        return db.Category.findAll()
        .then((data) => {
            res.json(data)
        }).catch((err) =>{
            res.status(500).json(err)
        })
    }
}