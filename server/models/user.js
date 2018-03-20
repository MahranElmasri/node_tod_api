const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
var userSchema=mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email' 
    }
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]

})
userSchema.methods.toJSON=function(){
  var user=this;
  var uesrObject=user.toObject();
  return _.pick(uesrObject,['_id','email'])
}
userSchema.methods.generateAuthToken=function(){
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'1234').toString();
  user.tokens.push({access,token})
  return user.save().then(()=>{
    return token
  })
}
userSchema.statics.findByToken=function(token){
  var User=this;
  var decode;
  try{
    decode=jwt.verify(token,'1234')
  }catch(e){
    return Promise.reject();
    // return new Promise((resolve,reject)=>{
    //   reject()
    // })
  }
  return User.findOne({
    '_id':decode._id,
    'tokens.token':token,
    'tokens.access':'auth'
  })
}
userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials=function(email,password){
  var User=this;

  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject()
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          return resolve(user);
        }else{
          return reject();
        }
      })
    })
  })

}
var User = mongoose.model('User', userSchema);

module.exports = {User}