const router = require('express').Router()
const images = require('../helpers/images')
const { getAllUsers, signin, signup, addItems, upload, getItems, addCategory, getCategories, getUserInfo} = require('../controllers/controller_user.js')
const { isLogin, isAdmin} = require('../middlewares/auth')

router.get('/', isLogin, getUserInfo)
router.post('/signin', signin)
router.post('/signup', signup)
router.get('/getItems', getItems)
router.post('/addCategories', addCategory)
router.get('/categories', getCategories)


router.post('/upload',
  isAdmin,
  images.multer.single('image'), 
  images.sendUploadToGCS,
  upload)

module.exports = router