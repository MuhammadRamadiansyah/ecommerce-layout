const jwt = require('jsonwebtoken')
const envKey = process.env.secretKey
const {isError} = require('../helpers/statusResponse')

module.exports = {
    isLogin: function(req, res, next){
        
        let token = req.headers.token;
        jwt.verify(token, envKey, (err, decoded)=>{
            if(err){
                isError(res, err, 500)
            }else{
                next()
            }
        })
        
    },
    isAdmin: function(req, res, next){
        let token = req.headers.token;
        jwt.verify(token, envKey, (err, decoded)=>{
					if(err){
						isError(res, err, 500)
					}else{
						if(decoded.role == "admin"){
							next()
						}else{
							let err = {
								message: "youre not allowed access this page"
							}
							isError(res, err, 403)
						}
					}
        })
    }
}