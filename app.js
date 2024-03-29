// dotenv
if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

// imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./error/error')
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express')

// documentation
const docs = YAML.load('./api-docs.yml')

// vars
const port = process.env.PORT || 3000

// app
const app = express()

// middlewares
app.use(express.json()); // parse json payloads
app.use(morgan('dev'));  // logging
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs))


// connect to database
require('./db/db')


// root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the NeoMerchant API')
})

// routes
app.use('/products', require('./api/routes/productsRoute'))
app.use('/users', require('./api/routes/usersRoute'))
app.use('/shoppingCart', require('./api/routes/shoppingCartRoute'))
app.use('/orders', require('./api/routes/ordersRoute'))

// error handler
app.use(errorHandler)

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})