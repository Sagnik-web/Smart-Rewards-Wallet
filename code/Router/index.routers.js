const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const walletRoutes = require('./wallet.routes');
const rewardsRoutes = require('./rewards.routes');



router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
router.use('/rewards', rewardsRoutes);



module.exports = router;