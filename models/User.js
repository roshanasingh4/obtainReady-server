const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ObtainrUserName:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: Date,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  const User = mongoose.model('users', UserSchema);
  module.exports = User;