import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      maxLength: [100, 'Product name can not exceed 100 characters.'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [5, 'Product price can not exceed 100 characters.'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please select category for this product.'],
      enum: {
        values: [
          'Electronics',
          'Cameras',
          'Laptops',
          'Accessories',
          'Headphones',
          'Food',
          'Books',
          'Cloths/Shoes',
          'Beauty/Health',
          'Sports',
          'Outdoor',
          'Home',
        ],
        message: 'Please select correct category for the product.',
      },
    },
    seller: {
      type: String,
      required: [true, 'Please enter product seller.'],
    },
    stock: {
      type: Number,
      require: [true, 'Please enter product stock.'],
      maxLength: [5, 'Product stock can not be more than 5 characters.'],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Product', productSchema)
