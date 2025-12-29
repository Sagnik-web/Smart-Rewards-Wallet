const mongoose = require('mongoose');
const Wallet = require('../Model/Wallet');
const Transaction = require('../Model/Transaction');
const RedeemedReward = require('../Model/RedeemedReward');
const Voucher = require('../Model/Voucher');
const status = require('../Constants/status.constants');



async function addMoney(userId, amount) {

  if (amount <= 0) throw { ...status.BAD_REQUEST, message: 'Amount must be positive' };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    
    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true, session }
    );

    if (!wallet) throw { ...status.NOT_FOUND, message: 'Wallet not found' };

    await Transaction.create([{
      userId, type: 'CREDIT', amount, timestamp: new Date()
    }], { session });
    
    await session.commitTransaction();
    return wallet;
  
  } catch (err) {
  
    await session.abortTransaction();
    throw err;
  
  } finally {
    session.endSession();
  }
}



async function redeem(userId, voucherId) {
  
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();
  
    const voucher = await Voucher.findOne({ voucherId, isActive: true }).session(session);
    if (!voucher) throw { ...status.NOT_FOUND, message: 'Voucher not found' };

    // conditional decrement only if balance >= voucher.value
    const wallet = await Wallet.findOneAndUpdate(
      { userId, balance: { $gte: voucher.value } },
      { $inc: { balance: -voucher.value } },
      { new: true, session }
    );

    if (!wallet) throw { ...status.BAD_REQUEST, message: 'Insufficient Balance' };

    await Transaction.create([{
      userId, type: 'DEBIT', amount: voucher.value, timestamp: new Date()
    }], { session });

    await RedeemedReward.create([{
      userId, voucherId: voucher.voucherId, voucherValue: voucher.value
    }], { session });

    await session.commitTransaction();
    return {  wallet, voucher };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

module.exports = { addMoney, redeem };
