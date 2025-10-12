const Router = require('express')
const router = new Router()
const productController = require('../controllers/productsController')
const checkRole = require('../middleware/authMiddleware')

router.get('/', productController.get)
router.get('/:id', productController.getID)
router.post('/',checkRole(), productController.post)
router.put('/:id',checkRole(), productController.put)
router.delete('/:id',checkRole(), productController.delete)

module.exports = router