const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    last_name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },
    balance: {
        type: number,
        required: [true, 'balanced cannot be empty'] 
    }
},{
    timestamps: true
})

userSchema.methods.comparePassword = function(plain_password, hash, callback){
    bcrypt.compare(plain_password, hash, function(err, result){
        if(err){
            callback(err)
        }else{
            callback(null,result)
        }
    })
}

let User = mongoose.model('Users', userSchema)

module.exports = User
