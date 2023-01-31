// dotenv
if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

// imports
const express = require('express')
const morgan = require('morgan')

// vars
const port = process.env.PORT || 3000

// app
const app = express()

// middlewares
app.use(express.json()); // parse json payloads
app.use(morgan('dev'));  // logging

// connect to database
require('./db/db')


// root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the NeoMerchant API')
})

// routes
app.use('/products', require('./api/routes/productsRoute'))

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})