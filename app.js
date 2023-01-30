// dotenv
if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

// imports
const express = require('express')

// app
const app = express()

// vars
const port = process.env.PORT || 3000

// hello world example
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})