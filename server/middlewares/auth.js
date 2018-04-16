const jtw = require('jsonwebtoken')
const bcrypt = require('bcript')
const envKey = process.env.secretKey
const {isError} = require('../helpers/statusResponse')

module.exports = {
    isLogin: function(req, res, next){
        
        let token = req.headers.token;
        jwt.verify(token, envKey, (err, decoded)=>{
            if(err){
                isError(res, err, status)
            }else{
                req.headers.token = decoded
                next(decoded)
            }
        })
        
    },
    isAdmin: function(req, res, next){
        let token = req.headers.token;
        jwt.verify(token, envKey, (err, decoded)=>{
            if(err){
                isError(res, err, status)
            }else{
                if(decoded.role == "admin"){
                    req.headers.token = decoded
                    next(decoded)
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