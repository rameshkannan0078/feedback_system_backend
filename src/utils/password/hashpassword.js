const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hash the password asynchronously
const hashPassword = async (plainPassword) => {
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error hashing password');
  }
};



const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
  }
};


module.exports = {
  hashPassword,
  comparePasswords,
};
