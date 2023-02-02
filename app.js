// dotenv
if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

// imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./error/error')

// vars
const port = process.env.PORT || 3000

// app
const app = express()

// middlewares
app.use(express.json()); // parse json payloads
app.use(morgan('dev'));  // logging
app.use(cors())


// connect to database
require('./db/db')


// root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the NeoMerchant API')
})

// routes
app.use('/products', require('./api/routes/productsRoute'))

// error handler
app.use(errorHandler)

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})