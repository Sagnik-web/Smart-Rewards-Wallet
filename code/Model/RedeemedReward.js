const mongoose = require('mongoose');


const redeemedSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  voucherId: { 
    type: String, 
    required: true 
  },
  redeemedAt: { 
    type: Date, 
    default: Date.now 
  },
  voucherValue: { 
    type: Number, 
    required: true 
  }
});


module.exports = mongoose.model('RedeemedReward', redeemedSchema);
