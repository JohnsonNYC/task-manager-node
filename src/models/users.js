const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a postive number')
            }
        }
    },
    email:{
        type: String,
        required: true, 
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true, 
        trim: true, 
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot be the word `password`')
            }
        }
    }
})

userSchema.statics.findByCredentials = async (email, password ) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to Login')
    } 
    return user
}
// Hash the plain text password before saving
userSchema.pre('save', async function (next){ // 'save' comes from documents of mongoose
    const user = this

    if(user.isModified('password')){ // isModified comes from mongoose
        user.password = await bcrypt.hash(user.password,8)
    }

    next() // allows for function to be completed 
})

const User = mongoose.model('User', userSchema)

module.exports = User