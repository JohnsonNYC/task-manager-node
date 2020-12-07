//Express provides us a local server to run tests and program 
require('./db/mongoose')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send("Get request are disabled")
//     }else{
//         next() 
//     }
// })

app.use(express.json()) // parse the incoming JSON for us to have it accessbile as an object 
app.use(userRouter)
app.use(taskRouter)

// ---- Start Server -----
app.listen(port, () =>{
    console.log("Server is up on " + port)
})

// const jwt = require('jsonwebtoken')
// const myFunction = async() =>{
//     const token = jwt.sign({_id:'abc123'},"thisismynewcourse",{expiresIn:"7 days"}) 
//     console.log(token)

//     const data =  jwt.verify(token, 'thisismynewcourse') //return payload or middle part of token if everything went well
//     console.log(data)
// }

// myFunction()