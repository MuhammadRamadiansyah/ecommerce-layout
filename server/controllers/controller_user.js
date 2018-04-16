const User = require('../models/users')
const jtw = require('jsonwebtoken')
const bcrypt = require('bcript')
const envKey = process.env.secretKey
const mongoose = require('mongoose')
const {isError, isSuccess} = require('../helpers/statusResponse')

module.exports = {
    getAllUsers: function(req, res){

    },
    signin: function(req, res){
        let email = req.body.email;
        let plain_password = req.body.password;
        User.findOne({email: email})
            .exec()
            .then(user=>{
                if(user == null){
                    let err = {
                        message: "username or password wromg"
                    }
                    isError(res, err, 400)
                }else{

                    let hash = user.password;
                    User.schema.methods.comparePassword(plain_password, hash, (err, result)=>{
                        if(err){
                            isError(res, err, 400)
                        }else{
                            if(result){
                                let message = 'success login'
                                isSuccess(res, user, 200, message)
                            } else{
                                let err = {
                                    message: "username or password incorrect"
                                }
                                isError(res, err, 400)
                            }
                        }
                    })
                    let message = "login successfully"
                    isSuccess(res, user, 200, message)
                }
            })
            .catch(err=>{
                isError(res, err, 500)
            })
    }
}