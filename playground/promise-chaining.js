require('../src/db/mongoose')
const User = require('../src/models/users')

User.findByIdAndUpdate('5fc55d04dc2f4922aada0c7b',{age: 1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})