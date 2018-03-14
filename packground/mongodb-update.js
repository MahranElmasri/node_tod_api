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
    // db.collection('Users').updateOne({_id:new ObjectID('5aa9712c0ae840ba5758e78a')},{name:'Rana12'}).then((res)=>{
    //     console.log(res)
    // })

    //  db.collection('Users').update({name:'Rana'},{$inc:{age:+1}}).then((res)=>{
    //     console.log(res)
    // })
    db.collection('Users').findOneAndUpdate({name:'Rana'},{$inc:{age:1}}).then((res)=>{
        console.log(res)
    })
    db.close()
})