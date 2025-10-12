const Router = require('express')
const router = new Router()
const promotionController = require('../controllers/promotionController')
const checkRole = require('../middleware/authMiddleware')

router.get('/', promotionController.get)
router.put('/:id',checkRole(), promotionController.put)

module.exports = router