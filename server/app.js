// Global Imports
import express from 'express'

// Project Imports
import products from './routes/Product.js'

import errorMiddleware from './middlewares/errors.js'

const app = express()
app.use(express.json())

// API Endpoints
app.use('/api/v1', products)

// Middleware to handle errors
app.use(errorMiddleware)

export default app
