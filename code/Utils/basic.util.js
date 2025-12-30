const isEmail = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

const isPhoneNumber = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};


module.exports = { isEmail, isPhoneNumber };