const mongoose=require('mongoose');

 mongoose.connect('mongodb://test:test@ds213229.mlab.com:13229/testapp');

 module.exports={mongoose}