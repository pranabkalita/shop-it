import express from 'express'

import { isAuthenticated, authorizeRoles } from './../middlewares/auth.js'

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from './../controllers/AuthController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forget-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

router.get('/me', isAuthenticated, getUserProfile)
router.put('/me/update', isAuthenticated, updateProfile)
router.put('/update-password', isAuthenticated, updatePassword)

router.get(
  '/admin/users',
  isAuthenticated,
  authorizeRoles('admin'),
  getAllUsers
)
router.get(
  '/admin/users/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  getUserById
)
router.put(
  '/admin/users/:id/update',
  isAuthenticated,
  authorizeRoles('admin'),
  updateUser
)
router.delete(
  '/admin/users/:id/delete',
  isAuthenticated,
  authorizeRoles('admin'),
  deleteUser
)

export default router
