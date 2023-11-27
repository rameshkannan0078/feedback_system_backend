const jwt = require('jsonwebtoken');
const COMMON_MESSAGE = require('../../common/lang/lang');
require('dotenv').config();



const authenticateToken = (req, res, next) => {

  const token = req.headers['x-access-token'];

  if (!token) {
    return res.send({
      status:false,
      statusCode:401,
      message:COMMON_MESSAGE.ERROR.UNAUTHORIZED_ACCESS
    });
  }


  jwt.verify(token,process.env.SECREAT_KEY, (err, decoded) => {
    if (err) {

      return res.send({
        status:false,
        statusCode:403,
        message:COMMON_MESSAGE.ERROR.FORBIDDEN
      });
    }

    req.user = decoded;

    next();
  });
};

module.exports = authenticateToken;
