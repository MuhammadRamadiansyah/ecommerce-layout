const router = require('express').Router()
const { getAllUsers, signin, signup, addItems} = require('../controllers/controller_user.js')
const { isLogin, isAdmin} = require('../middlewares/auth')

router.get('/', getAllUsers)
router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router