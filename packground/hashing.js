var {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var message='Hi I am here';
var hash=SHA256(message).toString();

console.log(message);
console.log(hash)
var data={
    id:10
}
var token=jwt.sign(data,'1234')
console.log(token)

var decode=jwt.verify(token,'1234');

console.log(decode)