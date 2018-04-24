const Users = require('../models/users')
const Items = require('../models/items')
const Categories = require('../models/categories')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const envKey = process.env.secretKey
const mongoose = require('mongoose')
const { isError, isSuccess } = require('../helpers/statusResponse')

module.exports = {
	getAllUsers: function(req, res){	
		Users.find()
				 .then((users) => {
					isSuccess(res, users, 200, 'success show all users')
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	signup: function(req, res){
			let newData = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password,
					balance: 50000,
					role: req.body.role,
					cart: []
			}
			bcrypt.hash(newData.password, 10, (err, hash) => {
					if(err) isError(res, err, 500);
					newData.password = hash
					let user = new Users(newData)
					user.save()
							.then((response) => {
								isSuccess(res, req.body, 201, 'success sign up')
							})
							.catch((err) => {
								isError(res, err, 500)
							})
			})
    },
	signin: function(req, res) {
		Users.findOne({email: req.body.email})
				 .then((user) => {
						if(user == null) {
							let err = {
								message: 'user not found'
							}
							isError(res, err, 500)
						} else {
							bcrypt.compare(req.body.password, user.password, (err, result) => {
								if(err) isError(res, err, 404);
								if(!result) isError(res, err = {message: 'wrong password'}, 400)
								let token = jwt.sign({id:user._id, email:user.email, role:user.role}, envKey)
								isSuccess(res, token, 200, 'success sign in')
							})
						}
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	upload: function(req, res) {
		Categories.findOne({name: req.body.category})
							.exec()
							.then((tag) => {
								if(tag == null) isError(res, err = {message: 'tag not found'}, 500)
								let newItem = {
									name: req.body.name,
									price: parseInt(req.body.price),
									quantity: parseInt(req.body.quantity),
									image: req.file.cloudStoragePublicUrl,
									category: tag._id
								}
								let item = new Items(newItem)
								item.save()
										.then((response) => {
											res.send({
												status: 200,
												message: 'Your file is successfully uploaded',
												link: req.file.cloudStoragePublicUrl
											})
										})
										.catch((err) => {
											isError(res, err, 500)
										})
							})
							.catch((err) => {
								isError(res, err, 500)
							}) 
	},
	getItems: function (req, res) {
		Items.find()
				 .populate('category')
				 .exec()
				 .then((response) => {
					 isSuccess(res, response, 200, 'success get all items data')
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	addCategory: function (req, res) {
		let newCategory = {
			name: req.body.name,
			books: []
		}
		let category = new Categories(newCategory)
		category.save()
						.then((result) => {
							isSuccess(res, result, 201, 'success add tags')
						})
						.catch((err) => {
							isError(res, err, 500)
						})
	},
	getCategories: function (req, res) {
		Categories.find()
							.then((categories) => {
								isSuccess(res, categories, 200, 'success get all categories')
							})
							.catch((err) => {
								isError(res, err, 500)
							})
	},
	addToCart: function (req, res) {
		let userId = req.decoded.id
		let updateData = {
			$push: {cart: req.body.book._id},
			updatedAt: new Date()
		}
		let updateBook = {
			quantity: req.body.book.quantity - 1,
			updatedAt: new Date()
		}
		Users.findOneAndUpdate({_id: userId}, updateData)
				 .then((user) => {
						if(user === null) {
							isError(res, err = {message: 'user not found'}, 500)
						} else {
							Items.findOneAndUpdate({_id: req.body.book._id}, updateBook)
									 .then((book) => {
										if(book===null){
											isError(res, err = {message: 'not found'}, 500)
										} else {
											res.status(200).json({
												book,
												user
											})
										}
									 })
									 .catch((err) => {
										 isError(res, err, 500)
									 })
						}
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	getUserInfo: function (req, res) {
		Users.findOne({_id: req.decoded.id})
				 .then((user) => {
					if(user === null) {
						isError(res, err = {message: 'user not found'})
					} else {
						isSuccess(res, user, 200, 'user found')
					}
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	checkout: function (req, res){
		req.body.updateItems.forEach(element => {
			Items.findOne({_id: element._id})
					 .exec()
					 .then((item) => {
						let updateData = {
							updatedAt: new Date,
							quantity: item.quantity - element.quantity
						}
						if(updateData.quantity > 0){
							item.update(updateData)
								.then((result) => {
									isSuccess(res, result, 200, 'success update')
								})
								.catch((err) => {
									isError(res, err, 500)
								})
						} else {
							item.remove({_id: element._id})
									 .then((result) => {
										isSuccess(res, result, 200, 'success update')
									 })
									 .catch((err) => {
										 isError(res, err, 55)
									 })
						}
					 })
					 .catch((err) => {
						 isError(res, err, 500)
					 })
		});
		Users.findOne({_id: req.decoded.id})
				 .then((user) => {
					user.update({
						balance: user.balance - req.body.totalPrice
					})
					.then((result) => {
						isSuccess(res, result, 200, 'success update')
					})
					.catch((err) => {
						isError(res, err, 500)
					})
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	deleteItem: function (req, res){
		Items.findOne({_id: req.params.id})
				 .then((item) => {
					item.remove()
							.then((result) => {
								isSuccess(res, result, 200, 'success delete')
							})
							.catch((err) => {
								isError(res, err, 500)
							})
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	},
	topUp: function (req, res) {
		Users.findOne({_id: req.decoded.id})
				 .then((user) => {
					user.update({
						updatedAt: new Date(),
						balance: user.balance + req.body.balance
					})
					.then((result) => {
						let newBalance = user.balance + req.body.balance
						isSuccess(res, newBalance, 200, 'success top up')
					})
					.catch((err) => {
						isError(res, err, 500)
					})
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	}
}