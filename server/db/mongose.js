const mongoose=require('mongoose');

//  mongoose.connect('mongodb://test:test@ds213229.mlab.com:13229/testapp');
 mongoose.connect('mongodb://localhost:27017/Dci');
 module.exports={mongoose}