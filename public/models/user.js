/*SwipSwap >> users in database*/

const mongoose = require('mongoose');

const userDB = new mongoose.Schema({
    username: String,
    type: String,
    name: String,
    rating: Number,
    faculty: String,
    phoneNumber: String,
    email: String,
    lineID: String,
    address: String,
    date: {
      type: String,
      default: () => today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  
    },
    img1: String,  
  })
  module.exports = mongoose.model('users', userDB);