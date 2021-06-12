import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

/* ------------------------------- all routes ------------------------------- */
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
const app = express()

dotenv.config()
connectDB()

/* -------------------------------- req.body -------------------------------- */
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
/* ------------------------------ error handler ----------------------------- */
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Api Is running')
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
