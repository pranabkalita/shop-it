import express from 'express'
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from './../controllers/ProductController.js'

const router = express.Router()

router.post('/admin/products', newProduct)
router.put('/admin/products/:id', updateProduct)
router.delete('/admin/products/:id', deleteProduct)

router.get('/products', getProducts)
router.get('/products/:id', getSingleProduct)

export default router
