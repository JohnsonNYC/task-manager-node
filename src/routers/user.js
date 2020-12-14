const User = require('../models/users')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')

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
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch (e){
        res.status(400).send(e)
    }
})
    // Logout
router.post('/users/logout', auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
}) 
    // Logout All Devices 

    // upload Images
const upload = multer({
    dest:'avatars',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a image'))
        }

        cb(undefined, true )
    }
})
router.post('/users/me/avatar', upload.single('avatar'), (req,res)=>{
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({error: error.message})
})
router.post('/users/logoutAll', auth, async(req,res) =>{
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
//Read
router.get('/users/me',auth , async (req,res)=>{
    res.send(req.user )
    // try{
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e){
    //     res.status(500).send(e)
    // }
})
// Update
router.patch('/users/me', auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })


    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates!"})
    }
    
    try{
        const user = req.user
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
router.delete('/users/me', auth ,async (req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch (e){
        res.status(500).send(e)
    }
})


module.exports = router