const errorHandler = ((err, req, res, next) => {

    console.log(err.message)

    // delagating to default error handler if 
    // response has already been written
    if (res.headersSent) {
        return next(err)
    }
    
    // if no status code or status code is 500,
    // send server error message
    if (!err.statusCode || err.statusCode === 500) {
        res.status(500).json({ message: "Internal server error" })
    }
    // send status message or "No message" if no status message was provided
    else {
        res.status(err.statusCode).json({ message: err.statusMessage ? err.statusMessage : "No message" })
    }
})

module.exports = errorHandler