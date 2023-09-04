const mongoose = require('mongoose');


const UserSchema  = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{ 
    type:String,
    required:true
  },
  cpassword:{ 
    type:String,
    required:true
  }, 
  phone:{ 
    type:Number,
    required:true
  },
 streetAddress:{ 
    type:String,
    required:true
  }, 
  city:{ 
    type:String,
    required:true
  }, 
  state:{ 
    type:String,
    required:true
  }, 
  country:{ 
    type:String,
    required:true
  }, 
  postalCode:{ 
    type:Number,
    required:true
  }, 

}, {timeStamp:true});

module.exports = mongoose.model('User',UserSchema);