// Global Imports
import dotenv from 'dotenv'
import app from './app.js'

// Project Imports
import connectDatabase from './config/database.js'

// App Config
dotenv.config({ path: './.env' })
const PORT = process.env.PORT || 8001

// Middlewares

// DB Config
connectDatabase()

// Listener
const server = app.listen(PORT, () =>
  console.log(
    `Server running on PORT : ${PORT} in ${process.env.NODE_ENV} mode.`
  )
)

// Handle Unhanded Promise Rejections
process.on('unhandledRejection', (err) => {
  console.warn(`ERROR: ${err.message}`)
  console.warn('Shutting down the server due to Unhandled Promise Rejection')

  server.close(() => {
    process.exit(1)
  })
})
