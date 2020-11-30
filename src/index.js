//Express provides us a local server to run tests and program 

const express = require('express')
const app = express()
const User = require('./models/users')
require('./db/mongoose')

const port = process.env.PORT || 3000;

app.use(express.json()) // parse the incoming JSON for us to have it accessbile as an object 

app.post('/users', (req,res)=>{
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    
    })
})

app.listen(port, () =>{
    console.log("Server is up on " + port)
})