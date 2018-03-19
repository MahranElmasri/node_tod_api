var {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var password='1234abc';
//  bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//       });
//     });
bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        console.log(hash)
    })
})
var hashedPassword='$2a$10$MkJOS5U2oIAzqhPNjoTok.BZWHp/o90SUKUHEEwmFDZO7lk/sLE1y';
bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res)
})
// var message='Hi I am here';
// var hash=SHA256(message).toString();

// console.log(message);
// console.log(hash)
// var data={
//     id:10
// }
// var token=jwt.sign(data,'1234')
// console.log(token)

// var decode=jwt.verify(token,'1234');

// console.log(decode)