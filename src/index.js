//Express provides us a local server to run tests and program 
require('./db/mongoose')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

app.use(express.json()) // parse the incoming JSON for us to have it accessbile as an object 
app.use(userRouter)
app.use(taskRouter)

// ---- Start Server -----
app.listen(port, () =>{
    console.log("Server is up on " + port)
})
