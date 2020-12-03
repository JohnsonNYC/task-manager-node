//Express provides us a local server to run tests and program 

const express = require('express')
const app = express()
const User = require('./models/users')
const Task = require('./models/tasks')

require('./db/mongoose')

const port = process.env.PORT || 3000;

app.use(express.json()) // parse the incoming JSON for us to have it accessbile as an object 

// REST API for Creating Resources 

// This below can be cleaned up using async
// app.post('/users', (req,res)=>{
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

app.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        res.send(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// REST API for Reading Resources  
    // Index - show all users 
app.get('/users',async (req,res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    } catch (e){
        res.status(500).send(e)
    }
})
    //Show - show one user
app.get('/users/:id',async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})
 // ------ Task 
// Create 
app.post('/tasks', async(req,res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})


// Read
    // Index
app.get('/tasks', async (req,res)=>{

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch (e){
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
    // Show 
app.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((Task)=>{
    //     if(!Task){
    //         return res.status(404).send()
    //     }
    //     res.send(Task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})


app.listen(port, () =>{
    console.log("Server is up on " + port)
})