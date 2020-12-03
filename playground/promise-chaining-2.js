require('../src/db/mongoose')
const Task = require('../src/models/tasks')

// Task.findByIdAndDelete('5fc5523181f0851dce4c187b').then((task)=>{
//     return Task.countDocuments({completed: false})
// }).then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5fc676d6f8e3122fe0ee8f3d').then( count => console.log(count)).catch(error => console.log(error))