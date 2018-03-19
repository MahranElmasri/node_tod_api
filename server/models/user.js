const mongoose = require('mongoose');
const validator=require('validator')
const jwt=require('jsonwebtoken')
const _=require('lodash')
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
var User = mongoose.model('User', userSchema);

module.exports = {User}