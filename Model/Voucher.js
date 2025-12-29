const mongoose = require('mongoose');


const voucherSchema = new mongoose.Schema({
  voucherId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  value: { 
    type: Number, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
});


module.exports = mongoose.model('Voucher', voucherSchema);
