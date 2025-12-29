const Wallet = require('../Model/Wallet');
const Transaction = require('../Model/Transaction');
const walletService = require('../Services/wallet.service');
const status = require('../Constants/status.constants');

exports.getWallet = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const wallet = await Wallet.findOne({ userId });
    const txs = await Transaction.find({ userId }).sort({ timestamp: -1 }).limit(50);

    res.status(status.SUCCESS.code).json({ 
      ...status.SUCCESS, 
      balance: wallet.balance, 
      transactions: txs 
    });

  } catch (err) {
    next(err);
  }
};

exports.addMoney = async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(status.BAD_REQUEST.code).json({ ...status.BAD_REQUEST, message: "Invalid amount" });
    }
    
    const wallet = await walletService.addMoney(req.user._id, amount);
    res.status(status.SUCCESS.code).json({ ...status.SUCCESS, balance: wallet.balance });

  } catch (err) {
    next(err);
  }
};

exports.redeem = async (req, res, next) => {
  try {
    const voucherId = req.params.voucherId;
    const result = await walletService.redeem(req.user._id, voucherId);
    
    res.status(status.SUCCESS.code).json({ 
      ...status.SUCCESS, 
      balance: result.wallet.balance, 
      redeemed: { 
        voucherId: result.voucher.voucherId, 
        value: result.voucher.value 
      } 
    });

  } catch (err) {
    next(err);
  }
};
