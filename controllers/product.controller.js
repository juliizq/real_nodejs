const db = require('../models');
const { getPagination, getPagingData } = require('../utils/pagination');
const { buildWhere } = require('../utils/query');
const { getProducts } = require('../validations/product.validation')

module.exports = {
    async getAll(req,res){
        try{
            const validation = getProducts.validate(req.query);

            if(validation.error){
                return res.status(400).json(validation.error)
            }

            const { page = 1, size =  10, ...filters } =  req.query;

            // Get correct limit/offset
            const { offset, limit } = getPagination(page, size);

            const where = buildWhere(filters);

            // Get total
            const total = await await db.Product.findAndCountAll({ where });

            // Get items paginate
           const { rows : products } = await db.Product.findAndCountAll({
                where,
                offset,
                limit,
                order: [ ['id', 'DESC'] ],
                includes : { model : db.Review }
            });

            // Get pagination
            const { totalItems, totalPages, currentPage } = getPagingData(total, page, size);
      
            return res.status(200).json({ totalItems, totalPages, currentPage , products });

        }catch(error){
            console.log('error:', error);
            if(error.status){
                return res.status(error.status).json(error.message);
            }
            return res.status(500).json('Something wrong happened');
        }
    }
}