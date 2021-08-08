import express from 'express'

import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from './../controllers/AuthController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forget-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

export default router
