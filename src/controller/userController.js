const User = require('../model/userModel');

const getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    return res.send({
      status:true,
      result:users,
      message:COMMON_MESSAGE.COMMON.CREATE_MESSAGE
    })
  } catch (error) {
   next(error)
  } 
};







module.exports ={
  getAllUsers
};
