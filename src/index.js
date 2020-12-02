//Express provides us a local server to run tests and program 

const express = require('express')
const app = express()
const User = require('./models/users')
const Task = require('./models/tasks')

require('./db/mongoose')

const port = process.env.PORT || 3000;

app.use(express.json()) // parse the incoming JSON for us to have it accessbile as an object 

// REST API for Creating Resources 
app.post('/users', (req,res)=>{
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})
// REST API for Reading Resources  
    // Index - show all users 
app.get('/users',(req,res)=>{
    User.find({}).then((Users)=>{
        res.send(Users)
    }).catch((e)=>{
        res.status(500).send()
    }); // returns all users
})
    //Show - show one user

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.post('/tasks', (req,res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})


app.listen(port, () =>{
    console.log("Server is up on " + port)
})