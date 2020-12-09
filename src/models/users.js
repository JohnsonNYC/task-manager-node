const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

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
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: "_id" ,
    foreignField: "owner"
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    
    return userObj
}

userSchema.methods.generateAuthToken = async function(){ //methods for instance functions
    const user = this
    const token = jwt.sign({_id: user.id.toString()},"thisismynewcourse")
    user.tokens = user.tokens.concat({token})

    await user.save()
    return token   
}

userSchema.statics.findByCredentials = async (email, password ) =>{ //static for model functions
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

// Deletes user's task when user is removed() 
userSchema.pre('remove', async function (next){
    const user = this; 
    await  Task.deleteMany({owner: user._id })
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User