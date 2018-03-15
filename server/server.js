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
 const mongoose=require('mongoose');

 mongoose.connect('mongodb://localhost:27017/Dci');

 var User=mongoose.model('User',{
     name:{
         type:String
     },
     address:{
         type:String
     }
 });

 var newUser= new User({
     name:'Mahran',
     address:'Berlin'
 });
 newUser.save();