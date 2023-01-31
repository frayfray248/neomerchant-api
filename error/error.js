module.exports.errorHandler = ((err, req, res, next) => {

    // log error message
    console.error(err.message)

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

// error creator function to customzie error messages sent in responses 
// request handlers may create errors with this function and throw them to 
// be caught and handled in the above errorHandler function
module.exports.createError = (statusCode, statusMessage, message) => {

    // error message defaults to statusMessage if no message arg was provided
    const error = new Error(message || statusMessage)

    // set statusCode and statusMessage to be sent in responses 
    error.statusCode = statusCode
    error.statusMessage = statusMessage

    return error

}