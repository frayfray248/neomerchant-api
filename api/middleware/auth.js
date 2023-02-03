const jwt = require('jsonwebtoken')

// authorization middleware for validating json web tokens
module.exports = (req, res, next) => {
    (async () => {
        try {

            // get token
            const token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_KEY)

            // save user data
            req.userData = decoded

            next()

        } catch(e) {

            // auth failed
            res.status(401).json({
                message: 'authorization failed'
            })

        }
    })()
}