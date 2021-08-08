import Product from './../models/Product.js'
import ErrorHandler from './../utils/errorHandler.js'
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import APIFeatures from '../utils/apiFeatures.js'

export const newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
})

export const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 4
  const productCount = await Product.countDocuments()

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()

  let products = await apiFeatures.query
  let filteredProductsCount = products.length

  apiFeatures.pagination(resultsPerPage)
  products = await apiFeatures.query

  res.status(200).json({
    success: true,
    count: products.length,
    resultsPerPage,
    productCount,
    filteredProductsCount,
    products,
  })
})

export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product not found.', 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  if (!product) {
    return next(new ErrorHandler('Product not found.', 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product not found.', 404))
  }

  return res.status(204).json({
    status: 'success',
  })
})

export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Product.findById(productId)
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment
        review.rating = rating
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

  await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
  })
})

export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})

export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  )

  const numOfReviews = reviews.length

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  res.status(200).json({
    success: true,
  })
})
