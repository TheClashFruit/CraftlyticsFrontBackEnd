const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

module.exports = {
  isEmailValid: (email) => {
    if (!email)
      return false;

    if(email.length > 254)
      return false;

    const valid = emailRegex.test(email);

    if(!valid)
      return false;

    const parts = email.split('@');

    if(parts[0].length > 64)
      return false;

    const domainParts = parts[1].split('.');

    return !domainParts.some((part) => {
      return part.length > 63;
    });
  },
  isUsernameValid: (username) => {
    if (!username)
      return false;

    return usernameRegex.test(username);
  }
};