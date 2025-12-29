require('dotenv').config();
const express = require('express');
const { requestLogger } = require('./Middlewares/logger');
const { errorHandler } = require('./Middlewares/errorHandler');

const router = require('./Router/index.routers');

const app = express();
app.use(express.json());
app.use(requestLogger);


app.use('/api/v1', router);


app.use(errorHandler);



app.get('/', (req, res) => {
  res.send('Health Check: OK');
});



module.exports = app;