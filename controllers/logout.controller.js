const { User } = require('../models');
const db = require('../models');

module.exports = {
    
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
            return res.status(400).json(err)
        }  
    }
}