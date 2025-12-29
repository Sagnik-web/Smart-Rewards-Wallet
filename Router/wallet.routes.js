const router = require('express').Router();
const { authenticate } = require('../Middlewares/auth');
const wallet = require('../Controller/wallet.controller');




router.get('/', authenticate, wallet.getWallet);
router.post('/add-money', authenticate, wallet.addMoney);
router.post('/redeem/:voucherId', authenticate, wallet.redeem);





module.exports = router;
