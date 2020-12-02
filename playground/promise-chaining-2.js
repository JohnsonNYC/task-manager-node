require('../src/db/mongoose')
const Task = require('../src/models/tasks')

Task.findByIdAndDelete('5fc5523181f0851dce4c187b').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})