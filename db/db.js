const mongoose = require('mongoose')


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (error) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log("Connected to database")
        }
    }
)