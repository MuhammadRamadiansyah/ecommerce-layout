const Users = require('../models/users')
const jtw = require('jsonwebtoken')
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
			console.log(req.body)
			let newData = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password,
					balance: 50000
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
		Users.findOne({email: req.body.emai})
				 .then((user) => {
					 console.log(user)
						if(user == null) {
							let err = {
								message: 'user not found'
							}
							isError(res, err, 500)
						} else {
							console.log(user)
							bcrypt.compare(req.body.password, user.password, (err, result) => {
								if(err) isError(res, err, 404);
								isSuccess(res, result, 200, 'success sign in')
							})
						}
				 })
				 .catch((err) => {
					 isError(res, err, 500)
				 })
	}
}