// const MongoCleint=require('mongodb').MongoClient;

// MongoCleint.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
//     if(err){
//         return console.log('Unable to connect MongoDB server');
    
//     }
//         console.log('connected to MongoDB server ');
//         // db.collection('Todos').insertOne({
//         //     text:'Something to do',
//         //     completed:false
//         // },(err,res)=>{
//         //     if(err){
//         //         return console.log('Unable to insert todo',err);
//         //     }
//         //     console.log(JSON.stringify(res.ops, undefined ,2));
//         // })

//         db.collection('Users').insertOne({
//             name:'Mahran',
//             age:37,
//             location:'Berlin'
//         },(err,res)=>{
//             if(err){
//                 return console.log('Unable to insert new user',err);
//             }
//             console.log(JSON.stringify(res.ops,undefined,2));
//         })
//     db.close();

// })

const MongoClient=require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/Test',(err,db)=>{
    if(err){
        return console.log('Unable to connect MongoDB server');
    }
        console.log('connected to MongoDB server');
        db.collection('Users').insertOne({
            name:'Rana',
            age:37
        },(err,res)=>{
            if(err){
                return console.log('Unable to insert new user',err);
            }
                console.log(res.ops);
        })

})