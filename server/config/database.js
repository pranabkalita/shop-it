import mongoose from 'mongoose'

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database Connected with HOST: ${con.connection.host}`
      )
    })
    .catch(() => {
      console.error('Failed to connect to Database.')
    })
}

export default connectDatabase
