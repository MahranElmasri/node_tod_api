const {MongoClient, ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Test',(err,db)=>{
    if(err){
        return console.log('Unable to connect MongoDB server',err);
    }
    console.log('conected tom MongoDB server');
    // db.collection('Users').find({}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     if(err){
    //         return console.log('Unable to find record',err)
    //     }
    // });
    // db.collection('Users').find({name:'Mahran'}).count().then((count)=>{
    //     console.log(`The records count is ${count}`)
    // },(err)=>{
    //     if(err){
    //         console.log('Unable to count the records ',err)
    //     }
    // })
    db.collection('Users').findOneAndDelete({name:'Rana'}).then((docs)=>{
        console.log(docs)
    },(err)=>{

    })
    db.close()
})