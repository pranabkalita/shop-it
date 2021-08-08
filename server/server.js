// Global Imports
import dotenv from 'dotenv'
import app from './app.js'

// Project Imports
import connectDatabase from './config/database.js'

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.error(`ERROR: ${err.stack}`)
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    console.error(`ERROR: ${err.message}`)
  }

  console.error('Shutting down server due to Uncaught Exceptions.')

  process.exit(1)
})

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
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.error(`ERROR: ${err.stack}`)
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    console.error(`ERROR: ${err.message}`)
  }

  console.warn('Shutting down the server due to Unhandled Promise Rejection')

  server.close(() => {
    process.exit(1)
  })
})
