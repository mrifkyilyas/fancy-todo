const {jwt} = require('../helpers')
const {User} = require('../models')
module.exports = { authen : function(req,res,next){
        const decoded = jwt.jwtVerify(req.headers.token)
        if(decoded){
            console.log('token valid')
            User
            .findOne({_id : decoded.id})
            .then(user =>{
                if(user){
                    next()
                    
                }else {
                    res.status(401).json({
                        message : ' authorize error'
                    })
                }
            })

        }else{
            res.status(400).json({
                message : ' token tidak valid '
            })

        }
      
        
   
}}