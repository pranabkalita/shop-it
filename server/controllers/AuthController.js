import crypto from 'crypto'
import cloudinary from 'cloudinary'

import User from './../models/User.js'
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from './../utils/errorHandler.js'
import sendToken from '../utils/jwtToken.js'
import { sendEmail } from './../utils/sendEmail.js'

export const register = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'shopit/avatars',
    width: 150,
    crop: 'scale',
  })

  const { name, email, password, avatar } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  })

  sendToken(user, 200, res)
})

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body

  // Check if email and password provided
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400))
  }

  // Find User by email
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }

  // Check if the provided password is correct
  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }

  // Send token with cookie
  sendToken(user, 200, res)
})

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: 'Logged Out.',
  })
})

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler('User not found with this email.', 404))
  }

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/reset-password/${resetToken}`

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email then please ignore.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Shop-IT password recovery',
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorHandler(error.message, 500))
  }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(
      new ErrorHandler('Invalid reset password token or has been expired.', 400)
    )
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match.', 400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save({ validateOnSave: false })

  sendToken(user, 200, res)
})

export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  if (
    !req.body.password ||
    !req.body.confirmPassword ||
    !req.body.oldPassword
  ) {
    return next(
      new ErrorHandler(
        'Old Password, Password and Confirm Password is required.',
        400
      )
    )
  }

  const user = await User.findById(req.user.id).select('+password')

  const isMatched = await user.comparePassword(req.body.oldPassword)

  if (!isMatched) {
    return next(new ErrorHandler('Old password does not match.', 400))
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match.', 400))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save({ validateOnSave: false })

  sendToken(user, 200, res)
})

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  }

  // TODO: Update avatar

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorHandler('User not found.', 402))
  }

  res.status(200).json({
    success: true,
    user,
  })
})

export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  // TODO: Update avatar

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id)

  if (!user) {
    return next(new ErrorHandler('User not found.', 404))
  }

  res.status(204).json({
    success: true,
    user,
  })
})
