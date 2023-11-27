const User = require("../model/userModel");
const Admin=require("../model/adminModel");
const PasswordUtils = require("../utils/password/hashpassword");
const jwt = require('jsonwebtoken');
const  COMMON_MESSAGE  = require('../common/lang/lang');

require('dotenv').config();


const signinUser = async (req, res,next) => {
  try {
    const { customerEmail, customerPassword } = req.body;
    


    if(!customerEmail && !customerPassword){
      return res.send({
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.COMMON.REQUIRED_DATA
       });
    }

    const user = await User.findOne({ customerEmail });

    if (!user) {
      return res.send({
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.USER.USER_NOT_FOUND
       });
    }

    const storedHashedPassword = user?.customerPassword;

    if (!storedHashedPassword) {
      return res.send({
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.USER.INVALID_USER
       });
    }


    const passwordsMatch = await PasswordUtils.comparePasswords(
      customerPassword,
      storedHashedPassword
    );

    

    if (passwordsMatch) {
      const token =jwt.sign({customerEmail},process.env.SECREAT_KEY,{
        expiresIn:process.env.EXPIRES_IN
      });
      return res.send({
        token,
        status:true,
        result:user,
        message:COMMON_MESSAGE.USER.LOGGED_IN
      })
    } else {
      return res.send({ 
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.USER.INVALID_USER
       });
    }
  } catch (error) {
    next(error)
  }
};


const addUser = async (req, res,next) => {
  let {  customerName, customerEmail, customerPassword, customerDateOfBirth } = req.body;
  const user = await User.findOne({ customerEmail });
  
  if (user) {
    return res.send({
      status:false,
      statusCode:401,
      message:COMMON_MESSAGE.USER.EMAIL_ALREADY_EXISTS
     });
  }  

  customerPassword=await PasswordUtils.hashPassword(customerPassword);  
  try {
    const newUser = new User({
      customerName,
      customerEmail,
      customerPassword,
      customerDateOfBirth,
    });

    const savedUser = await newUser.save();

    return res.send({
      status:true,
      result:savedUser,
      message:COMMON_MESSAGE.COMMON.CREATE_MESSAGE
    })
  } catch (error) {
    next(error)
  }
};



const createAdmin = async (req, res,next) => {

  let { adminEmail, adminPassword } = req.body;
  const user = await Admin.findOne({ adminEmail });
  
  if (user) {
    return res.send({
      status:false,
      statusCode:401,
      message:COMMON_MESSAGE.USER.EMAIL_ALREADY_EXISTS
     });
  }  

  console.log({ adminEmail,adminPassword})

  adminPassword=await PasswordUtils.hashPassword(adminPassword); 
  


  try {
    const newUser = new Admin({
      adminEmail,
      adminPassword,
      type:'ADMIN'
    });

    const savedUser = await newUser.save();

    return res.send({
      status:true,
      result:savedUser,
      message:COMMON_MESSAGE.COMMON.CREATE_MESSAGE
    })
  } catch (error) {
    next(error)
  }
};


const signinAdmin= async (req, res,next) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    if(!adminEmail && !adminPassword){
      return res.send({
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.COMMON.REQUIRED_DATA
       });
    }

    const user = await Admin.findOne({ adminEmail });

    if (!user) {
      return res.send({
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.USER.USER_NOT_FOUND
       });
    }

    const storedHashedPassword = user?.adminPassword;

    if (!storedHashedPassword) {
      return res.send({
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.USER.INVALID_USER
       });
    }


    const passwordsMatch = await PasswordUtils.comparePasswords(
      adminPassword,
      storedHashedPassword
    );


    if (passwordsMatch) {
      const token =jwt.sign({adminEmail},process.env.SECREAT_KEY,{
        expiresIn:process.env.EXPIRES_IN
      });
      return res.send({
        token,
        status:true,
        result:user,
        message:COMMON_MESSAGE.USER.LOGGED_IN
      })
    } else {
      return res.send({ 
        status:false,
        statusCode:404,
        message:COMMON_MESSAGE.USER.INVALID_USER
       });
    }
  } catch (error) {
    next(error)
  }
};


module.exports = {
  signinUser,
  addUser,
  createAdmin,
  signinAdmin
};
