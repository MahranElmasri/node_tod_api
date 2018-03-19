

// const mongoose = require("mongoose");

// // mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/TodoApp");

// var Todo = mongoose.model("Todo", {
//   text: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   },
//   completedAt: {
//     type: Number
//   }
// });

// var newTodo = new Todo({
//   text: "Cook dinner"
// });

// newTodo.save();
//  const mongoose=require('mongoose');

//  mongoose.connect('mongodb://localhost:27017/Dci');

//  var User=mongoose.model('User',{
//      name:{
//          type:String,
//          required:true,
//          minlength:1,
//          trim:true
//      },
//      address:{
//          type:String
//      }
//  });

//  var newUser= new User({
//      name:'Mahran',
//      address:'Berlin'
//  });
//  newUser.save();

var express = require('express');
var _=require('lodash');
var bodyParser = require('body-parser');
var {ObjectID}=require('mongodb');
var {mongoose} = require('./db/mongose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
mongoose.Promise=global.Promise;
var app = express();
var port=process.env.PORT||3000
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    name: req.body.name
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(err)=>{
        res.status(400).send(e)
    })
})
app.get('/users',(req,res)=>{
    User.find().then((doc)=>{
        res.send({doc})
    },(e)=>res.status(400).send(e))
})

app.post('/users',(req,res)=>{
    var user=new User({
        email:req.body.email
    });
    user.save().then((doc)=>{
        res.send(doc);
    },(e)=>res.status(400).send(e))
})
app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!true){
        return res.status(400).send()
    }
    Todo.findById(id).then((doc)=>{
        if(!doc){
            return res.status(400).send()
        }
        res.send({doc})
    })
})
app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    Todo.findOneAndRemove(id).then((doc)=>{
        res.send(doc)
    },(err)=>{
        res.status(400).send()
    })
})
app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
  
    Todo.findByIdAndUpdate({_id:id},req.body).then(()=>{
        Todo.findOne({_id:id}).then((doc)=>{
            res.send({doc})
        })
        
    
    },(err)=>{res.status(400).send()})
})
app.listen(port, () => {
    console.log(`Started st port ${port}`);
  });
module.exports = {app};
