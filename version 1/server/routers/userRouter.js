const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkRole = require('../middleware/authMiddleware')


router.get('/check', checkRole(), userController.checkUser)
router.post('/login', userController.login)

module.exports = router