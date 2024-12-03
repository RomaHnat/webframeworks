const bcrypt = require('bcrypt');

const comparePassword = async (candidatePassword, hashedPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  comparePassword
};