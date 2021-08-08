// Global Imports
import express from 'express'
import cookieParser from 'cookie-parser'

// Project Imports
import products from './routes/Product.js'
import user from './routes/User.js'

import errorMiddleware from './middlewares/errors.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// API Endpoints
app.use('/api/v1', products)
app.use('/api/v1', user)

// Middleware to handle errors
app.use(errorMiddleware)

export default app
