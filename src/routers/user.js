const User = require('../models/users')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()


// This below can be cleaned up using async
// app.post('/users', (req,res)=>{
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

//Create
router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    
    try { 
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})
// Login 
router.post('/users/login', async (req,res)=>{
    //find user by credentials. Email and password 
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch (e){
        res.status(400).send(e)
    }
})
//Read
    // Index - show all users 
router.get('/users/me',auth , async (req,res)=>{
    res.send(req.user )
    // try{
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e){
    //     res.status(500).send(e)
    // }
})
    //Show - show one user
router.get('/users/:id',async (req,res)=>{
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

// Update
router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })


    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates! "})
    }
    _id = req.params.id
    try{
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        // findByIdAndUpdate bypasses mongoose so we use findById 
        const user = await User.findById(_id)
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })

        await user.save()
        if(!user){
            res.status(404).send()
        }

        res.send(user)
    }catch (e) {
        res.status(400).send(e)
    }
})
// Delete 
router.delete('/users/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e){
        res.status(500).send(e)
    }
})


module.exports = router