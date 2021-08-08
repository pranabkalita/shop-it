import express from 'express'

import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from './../controllers/OrderController.js'
import { isAuthenticated, authorizeRoles } from './../middlewares/auth.js'

const router = express.Router()

router.get(
  '/admin/orders',
  isAuthenticated,
  authorizeRoles('admin'),
  getAllOrders
)
router.put(
  '/admin/orders/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  updateOrder
)
router.delete(
  '/admin/orders/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteOrder
)

router.post('/orders/new', isAuthenticated, authorizeRoles('user'), newOrder)
router.get('/orders/me', isAuthenticated, authorizeRoles('user'), myOrders)
router.get('/orders/:id', isAuthenticated, getSingleOrder)

export default router
