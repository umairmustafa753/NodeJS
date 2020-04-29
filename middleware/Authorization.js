const JWT = require("../services/jwt");

const Authorization = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization failed auth header!");
    }
    const token = authHeader.split("Bearer ")[1];
    if (!token || token === "") {
      throw new Error("Authorization failed! not have a token");
    }
    const decoded = JWT.verify(token);
    if (!decoded) {
      throw new Error("Authorization failed! can not decode");
    }
    req.isAuthenticated = true;
    req.authUser = decoded;
    next();
  } catch (error) {
    req.isAuthenticated = false;
    return res.status(401).send({
      message:
        typeof error === "string"
          ? error
          : "Authorization failed! error in caught in catch "
    });
  }
};

module.exports = Authorization;
