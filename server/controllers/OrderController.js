import Order from './../models/Order.js'
import Product from './../models/Product.js'
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from './../utils/errorHandler.js'

export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  })

  res.status(200).json({
    success: true,
    order,
  })
})

export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!order) {
    return next(new ErrorHandler('Order not found.', 404))
  }

  res.status(200).json({
    success: true,
    order,
  })
})

export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
  }).populate('user', 'name email')

  res.status(200).json({
    success: true,
    orders,
  })
})

export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email')

  let totalAmount = 0

  if (orders) {
    orders.forEach((order) => {
      totalAmount += order.totalPrice
    })
  }

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  })
})

export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order.', 400))
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity)
  })

  order.orderStatus = req.body.status
  order.deliveredAt = Date.now()
  await order.save()

  res.status(200).json({
    success: true,
    order,
  })
})

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id)

  product.stock = product.stock - quantity
  await product.save({ validateBeforeSave: false })
}

export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndRemove(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Order not found.', 404))
  }

  res.status(204).json({
    success: true,
    order,
  })
})
