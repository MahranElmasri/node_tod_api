const express=require('express');
const bodyParse=require('body-parser');
const _=require('lodash')
const {mongoose}=require('./db/mongose')
var {ObjectID}=require('mongodb');
var {Todo}=require('./models/todo');
var {User}=require('./models/user')
var {authenticate}=require('./middleware/authenticate')


mongoose.Promise=global.Promise;
const app=express();
app.use(bodyParse.json());

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(err)=>{
        res.status(400).send(e)
    })
}) 

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send('...');
    }
    Todo.findById(id).then((todos)=>{
        if(!todos){
            return res.status(400).send()
        }
        res.send({todos})
    },(err)=>{
        res.status(400).send(e)
    })
})

app.post('/todos',(req,res)=>{
    var name=req.body.name;
    Todo.insertMany({name:name}).then((todo)=>{
        res.send(todo)
    },(err)=>{
        res.status(400).send(e)
    })
})
app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400).send()
    }
    Todo.findByIdAndRemove(id).then((todos)=>{
        if(!todos){
            res.status(400).send()
        }
        res.send(todos)
    })
})

app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['name','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(400).send()
    }
    Todo.findByIdAndUpdate({_id:id},body).then((doc)=>{
        if(!doc){
            res.status(400).send();
        }
        Todo.findById(id).then((todo)=>{
            res.send(todo)
        })
        
    })
})

app.get('/users',(req,res)=>{
    User.find().then((users)=>{
        res.send({users})
    },(err)=>{
        res.status(400).send()
    })
})

app.get('/users/me',authenticate,(req,res)=>{
   res.send(req.user)
})

app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password'])
    var user=new User(body);
    user.save().then(()=>{
        // res.send(users)
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user)
    }).catch((e)=>res.status(400).send())
})

app.delete('/users/:id',(req,res)=>{
    var id=req.params.id
    User.findByIdAndRemove(id).then((user)=>{
      
            res.send(user) 
    })
})




app.listen(3000,()=>console.log('Started on port 3000....'))