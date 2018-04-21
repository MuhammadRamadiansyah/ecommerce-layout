const mongoose = require('mongoose')
const Schema = mongoose.Schema

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    items:[{
      type: Schema.Types.ObjectId,
      ref: "items"
    }]
},{
    timestamps: true
})

let Category = mongoose.model('categories', categorySchema)

module.exports = Category
