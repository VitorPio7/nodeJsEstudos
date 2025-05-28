const mongoose = require('mongoose');
const validator = require('validator');

//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You have to put a name']
  },
  email: {
    type: String,
    required: [true, 'An email has to be send'],
    unique: true,
    trim: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please provid a valid email'] /*verifica se esse email é válido */
  },
  photo: String,
  password: {
    type: String,
    trim: true,
    required: [true, 'You must have to put the password.'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You must have to confirm the password.']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;