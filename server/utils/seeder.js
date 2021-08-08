import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

import connectDatabase from './../config/database.js'
import Product from './../models/Product.js'

dotenv.config({ path: '.env' })

console.log(process.env.DB_URL)

connectDatabase()

const __dirname = dirname(fileURLToPath(import.meta.url))

const productData = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/products.json`, 'utf8')
)
const seedProducts = async () => {
  try {
    await Product.deleteMany()
    console.log('Products are deleted.')

    await Product.insertMany(productData)
    console.log('Products are added.')

    process.exit()
  } catch (error) {
    console.error(error.message)
    process.exit()
  }
}

seedProducts()
