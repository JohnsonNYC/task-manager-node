// Mongoose being used to build out models and connect to database .
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})