import Product from './../models/Product.js'

export const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
}

export const getProducts = async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  })
}

export const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.',
    })
  }

  res.status(200).json({
    success: true,
    product,
  })
}

export const updateProduct = async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.',
    })
  }

  res.status(200).json({
    success: true,
    product,
  })
}

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found.',
    })
  }

  return res.status(204).json({
    status: 'success',
  })
}
