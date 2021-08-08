// Global Imports
import express from 'express'
import cookieParser from 'cookie-parser'

// Project Imports
import user from './routes/User.js'
import products from './routes/Product.js'
import order from './routes/Order.js'

import errorMiddleware from './middlewares/errors.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// API Endpoints
app.use('/api/v1', products)
app.use('/api/v1', user)
app.use('/api/v1', order)

// Middleware to handle errors
app.use(errorMiddleware)

export default app
