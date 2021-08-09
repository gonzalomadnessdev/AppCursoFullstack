const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  id : Number,
  firstName:  String, 
  lastName: String,
  password:   String,
  phone: Number,
  email: String,
  isActive: Boolean
},{collection: 'Users'});

const User = mongoose.model('Users', userSchema);

module.exports = User;