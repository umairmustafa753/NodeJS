const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.JWT_SECRET;

const JWT = {
  createToken: (user) => {
    return "thisisthetokenof:" + user.id;
  },
  verify: (token) => {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      throw new Error("jwt token not verified");
    }
  },

  generateToken: (user) => {
    return jwt.sign(
      {
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    );
  }
};
module.exports = JWT;
