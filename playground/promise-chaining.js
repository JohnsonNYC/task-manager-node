require('../src/db/mongoose')
const { update } = require('../src/models/users')
const User = require('../src/models/users')

// User.findByIdAndUpdate('5fc55d04dc2f4922aada0c7b',{age: 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

const updateAgeAndCount = async(id, age) => { // asyn makes the function return a promise
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count 
}   

console.log('What doe this return',updateAgeAndCount('5fc55d04dc2f4922aada0c7b', 55 ))
