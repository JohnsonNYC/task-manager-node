//Express provides us a local server to run tests and program 
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000;
const app = express()

// const multer = require('multer')
// const upload = multer({
//     dest:'images'
// })

// app.post('/upload', upload.single('upload'),(req,res)=>{
//     res.send()
// })

app.use(express.json()) // parse the incoming JSON for us to have it accessbile as an object 
app.use(userRouter)
app.use(taskRouter)

// ---- Start Server -----
app.listen(port, () =>{
    console.log("Server is up on " + port)
})