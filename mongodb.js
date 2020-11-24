// Create all CRUD operations

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to database')
    }
    
    const db = client.db(databaseName);
    // ----- Create -----
    // db.collection('users').insertOne({
    //     name:'Min',
    //     age: 21
    // }, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Jen',
    //         age: 28
    //     },
    //     {
    //         name:'Luis',
    //         age:33
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Task 1',
    //         completed: true
    //     },
    //     {
    //         description:'Task 2',
    //         completed: false
    //     },
    //     {
    //         description:'Task 3',
    //         completed: false
    //     }
    // ],(error, result)=>{
    //     if(error) return console.log('Unable to insert documents')

    //     console.log(result.ops)
    // })


})