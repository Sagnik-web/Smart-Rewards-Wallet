const router = require('express').Router();
const rewards = require('../Controller/rewards.controller');




router.post('/seed', rewards.seedVouchers);




module.exports = router;
