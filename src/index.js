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

// const Task = require('./models/tasks')
// const User = require('./models/users')
// const main = async()=>{
//     // Task -> User
//     // const task = await Task.findById("5fd102f8102963f3371dd7e9")
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     // User -> Task
//     const user = await User.findById('5fd10192880fc1f287eda82f')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }   

// main()