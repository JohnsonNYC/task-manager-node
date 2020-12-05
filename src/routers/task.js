const Task = require('../models/tasks')
const express = require('express')
const User = require('../models/users')
const router = new express.Router()

// ------ Tasks --------
// Create 
router.post('/tasks', async(req,res)=>{
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
router.get('/tasks', async (req,res)=>{

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
router.get('/tasks/:id', async (req,res)=>{
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
// Update
router.patch('/tasks/:id', async (req, res)=>{
    const updates = Object.keys(req.body) // []
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every(update =>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid Updates"})
    }
    const _id = req.params.id

    try{
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new:true, runValidators:true})
        const task = await Task.findById(_id)
        updates.forEach(update =>{
            task[update] = req.body[update]
        })
        await task.save()
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
// Delete
router.delete('/tasks/:id', async (req,res)=>{

    try{
        // Success Handler
        const task = await Task.findByIdAndDelete(req.params.id)
        
        if(!task){ // Not Found Handler
            return res.status(404).send()
        }

        res.send(task)
    }catch (e){
        // Error Handler
        res.status(500).send()
    }
})

module.exports = router