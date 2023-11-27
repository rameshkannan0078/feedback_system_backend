const COMMON_MESSAGE = require('../common/lang/lang');
const User = require('../model/userModel');

const getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    return res.send({
      statusCode:200,
      status:true,  
      result:users,
      message:COMMON_MESSAGE.COMMON.FETCH_SUCCESS
    })
  } catch (error) {
   next(error)
  } 
};

const deleteSingleUser = async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    return res.send({
      status: false,
      statusCode: 404,
      message: COMMON_MESSAGE.ERROR.INTERNAL_ERROR
    });
  }

  try {
    const deleteUser = await User.findByIdAndDelete({ _id:id });

    if (!deleteUser) {
      return res.send({
        status: false,
        statusCode: 404,
        message: COMMON_MESSAGE.ERROR.INTERNAL_ERROR
      });
    }

    res.send({
      status: true,
      statusCode: 200,
      message: COMMON_MESSAGE.COMMON.DELETE_MESSAGE,
      result: deleteUser,
    });
  } catch (error) {
    next(error);
  }
};







module.exports ={
  getAllUsers,
  deleteSingleUser
};
