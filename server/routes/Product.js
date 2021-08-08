import express from 'express'
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from './../controllers/ProductController.js'

import { isAuthenticated, authorizeRoles } from '../middlewares/auth.js'

const router = express.Router()

router.post(
  '/admin/products',
  isAuthenticated,
  authorizeRoles('admin'),
  newProduct
)
router.put(
  '/admin/products/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  updateProduct
)
router.delete(
  '/admin/products/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteProduct
)

router.get('/products', getProducts)
router.get('/products/:id', getSingleProduct)

export default router
