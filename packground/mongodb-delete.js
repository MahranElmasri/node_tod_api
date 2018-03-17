const {MongoClient, ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Test',(err,db)=>{
    if(err){
        return console.log('Unable to connect MongoDB server',err);
    }
    console.log('conected tom MongoDB server');
//    db.collection('Users').deleteMany({name:'Rana'}).then((res)=>{
//        console.log(res);
//    })
    // db.collection('Users').findOneAndDelete({name:'Rana'}).then((docs)=>{
    //     console.log(docs)
    // },(err)=>{

    // });
    db.collection('Users').deleteOne({_id:new ObjectID('5aa971400ae840ba5758e794')}).then((res)=>{
        console.log(res)
    })
    db.close()
})