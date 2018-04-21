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
    category: {
			type: Schema.Types.ObjectId,
			ref: "categories"
    },
},{
    timestamps: true
})

itemSchema.pre('save', function(next){	
	this.model('categories').update(   
		{_id:  {$in: this.category}}, 
		{$push: {items: this._id}}, 
		{multi: true},
		next,
	)
});

let Item = mongoose.model('items', itemSchema)

module.exports = Item
