// Global Imports
import express from 'express'

// Project Imports
import products from './routes/Product.js'

const app = express()
app.use(express.json())

// API Endpoints
app.use('/api/v1', products)

export default app
