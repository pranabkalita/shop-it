import dotenv from 'dotenv'
import { app } from './app.js'

// App Config
dotenv.config({ path: './.env' })
const PORT = process.env.PORT || 8001

// Middlewares

// DB Config

// API Endpoints

// Listener
app.listen(PORT, () =>
  console.log(
    `Server running on PORT : ${PORT} in ${process.env.NODE_ENV} mode.`
  )
)
