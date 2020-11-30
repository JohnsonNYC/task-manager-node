// Create all CRUD operations
// 

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to database')
    }
    console.log('CLIENT',client.db)
    const db = client.db(databaseName);
    // ---- Delete -----
    // db.collection('tasks').deleteOne({
    //     description: 'Task 1'
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })


    // db.collection('users').deleteMany({
    //     age:25
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    // ----- Update -----
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5fbd38c21f55a04488c3d6f7")
    // },{
    //     $set:{
    //         name:"Mike"
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: true
    // },{
    //     $set:{
    //         completed: false
    //     }
    // }).then(result => {
    //     console.log('RESULT', result)
    // }).catch(error => {
    //     console.log('ERROR', error)
    // })
    //---- Read -----

    // db.collection('users').findOne({name:'Jen', age: 1}, (error, user)=>{
    //     if(error) return console.log('Unable to fetch')

    //     console.log(user)
    // } )

    // db.collection('users').find({ age: 25}).count((error,users)=>{
    //     console.log(users)
    // })

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