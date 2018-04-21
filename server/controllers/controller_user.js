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
		console.log(req.body.email)
		Users.findOne({email: req.body.email})
				 .then((user) => {
					 console.log(user)
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
	}
}