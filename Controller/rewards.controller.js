const status = require('../Constants/status.constants');
const Voucher = require('../Model/Voucher');

exports.seedVouchers = async (req, res, next) => {
  try {
  
    const vouchers = [
      { voucherId: 'AMZ200', brand: 'Amazon', value: 200 },
      { voucherId: 'ZOM100', brand: 'Zomato', value: 100 },
      { voucherId: 'FLP300', brand: 'Flipkart', value: 300 },
      { voucherId: 'MYN250', brand: 'Myntra', value: 250 },
      { voucherId: 'SWG150', brand: 'Swiggy', value: 150 },
    ];
    
    const result = await Voucher.insertMany(vouchers, { ordered: false });

    res.status(status.CREATED.code).json({ ...status.CREATED, inserted: result.length });
  
  } catch (err) {
    next(err);
  }
};
