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
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
mongoose.Promise=global.Promise;
var app = express();

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


// app.post('/users',(req,res)=>{
//     var user=User({
//         email:req.body.email
//     });
//     user.save().then((doc)=>{
//         res.send(doc);
//     },(err)=>{
//         res.status(400).send(e)
//     })
// })



app.listen(3000, () => {
    console.log('Started on port 3000');
  });
module.exports = {app};
