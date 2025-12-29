const status = require("../Constants/status.constants");

exports.errorHandler = (err, req, res, next) => {
  console.error(err.code, err.message, err.name);
  if (err.name === 'ValidationError') {
    return res.status(status.BAD_REQUEST.code).json({...status.BAD_REQUEST, message: 'ValidationError', details: err.message });
  }
  if (err.name === 'MongoBulkWriteError' && err.code === 11000) {
    return res.status(status.CONFLICT.code).json({...status.CONFLICT, message: 'DuplicateKey error, '+err.message, details: err.keyValue });
  }

  
  res.status(status.INTERNAL_SERVER_ERROR.code).json({...status.INTERNAL_SERVER_ERROR, message: err.message || 'InternalServerError' });
};
