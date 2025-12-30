const status = {
    SUCCESS: { success:1, code: 200, status_message: 'Success' },
    CREATED: { success:1, code: 201, status_message: 'Resource created' },
    BAD_REQUEST: { success:0, code: 400, status_message: 'Bad request' },
    UNAUTHORIZED: { success:0, code: 401, status_message: 'Unauthorized' },
    FORBIDDEN: { success:0, code: 403, status_message: 'Forbidden' },
    NOT_FOUND: { success:0, code: 404, status_message: 'Not found' },
    CONFLICT: { success:0, code: 409, status_message: 'Conflict' },
    INTERNAL_SERVER_ERROR: { success:0, code: 500, status_message: 'Internal server error' },
    CATCH_ERROR: {success:0, code: 500, status_message:'Internal server error',message:"Something Wents Wrong"}
};
  

module.exports = status;