const COMMON_MESSAGE = {
    USER: {
        LOGGED_IN: 'Logged in Successfully',
        INVALID_USER: 'Incorrect Email or Password',
        EMAIL_ALREADY_EXISTS: 'Email already exists. Please choose a different email.',
        USER_NOT_FOUND: 'User not found',
        },
    ERROR: {
        NOT_FOUND: 'Not Found',
        SERVER_ERROR: 'Server Error or DB Error Occurs',
        INTERNAL_ERROR: 'Internal server error',
        UNAUTHORIZED_ACCESS: 'Unauthorized Access',
        INVALID_CREDENTIALS: 'Invalid Credentials',
        ACCESS_DENIED: 'Access Denied',
        FORBIDDEN:'Forbidden Access'
    },
    COMMON:{
        REQUIRED_DATA:'Additional body or parameters are required to access',
        INPUT_REQUIRED: 'Input Field is required',
        CREATE_MESSAGE: 'New Data has been added successfully',
        UPDATE_MESSAGE: 'Data has been updated successfully',
        DELETE_MESSAGE: 'Data has been deleted successfully',
        FETCH_SUCCESS: 'Data has been fetched successfully',
    }
};

module.exports = COMMON_MESSAGE;
