const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    quantity: {
        type: Number,
        required: [true, 'balanced cannot be empty'] 
    },
    price: {
      type: Number,
      required: [true, 'balanced cannot be empty'] 
    },
    image: {
      type: String,
    },
},{
    timestamps: true
})

let Item = mongoose.model('items', itemSchema)

module.exports = Item
