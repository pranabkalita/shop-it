export const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Get all products list',
  })
}
