const {MongoClient}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Test',(err,db)=>{
    if(err){
        return console.log('Unable to connect MongoDB server',err);
    }
    console.log('conected tom MongoDB server');
    db.collection('Users').find({name:'Mahran'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        if(err){
            return console.log('Unable to find record',err)
        }
    })
})