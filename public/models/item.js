/*Swipswap >> items in database json*/

const mongoose = require('mongoose');

const today = new Date();

const itemsDB = new mongoose.Schema({
    idOwner: String,
    idReceiver: String,
    nameOwner: String,
    type: String,
    nameItem: String,
    ratingOwner: Number,
    condition: Number,
    shipment: String,
    interesting: String,
    category: String,
    description: String,
    date: {
      type: String,
      default: () => today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    },
    img2: String,
    img5: String,
    img6: String,  
    available: {
      type: Boolean,
      default: true
    },
    offeror: Array,    
    itemExchange: Array,
    Dealing_User: String,
    Dealing_Item: String,
    Confirm_Count: Array
  })

module.exports = mongoose.model('Items', itemsDB);
