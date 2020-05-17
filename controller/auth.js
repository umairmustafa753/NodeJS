const Users = require("../services/user");
const JWT = require("../services/jwt");
const UserFromService = require("../services/user");

module.exports = {
  Signup: async (req, res) => {
    const obj = req.body;
    try {
      const user = await Users.getByEmail(obj.email);
      if (user) {
        return res.status(409).send({ message: "email already exists" });
      }
      const newUser = await Users.createUser(obj);
      if (newUser) {
        return res
          .status(200)
          .send({ data: "", message: "Successfully Signup. Please login!" });
      }
    } catch (error) {
      console.log("error", error);
      res
        .status(500)
        .send({ message: "fill all fields and enter unique username" });
    }
  },

  Login: async (req, res) => {
    try {
      const obj = req.body;
      let user = await Users.getByEmail(obj.email);
      if (user) {
        const comparePass = Users.compare(user.password, obj.password);
        if (comparePass) {
          // to convert from mongoose instance to js object
          const token = JWT.generateToken(user);
          user = user.toObject();
          delete user.password;
          return res
            .status(200)
            .send({ data: { user, token }, message: "Successfully Login" });
        } else {
          return res
            .status(409)
            .send({ message: "Email/Password does not match!" });
        }
      }
      return res
        .status(404)
        .send({ data: { user }, message: "Email/Password does not match!" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  autoLogin: async (req, res) => {
    try {
      let user = await UserFromService.getById({ _id: req.params.id });
      const token = JWT.generateToken(user);
      if (user) {
        return res
          .status(200)
          .send({ data: { user, token }, message: "Successfully Login" });
      }
      return res
        .status(404)
        .send({ data: { user }, message: "Plase Login again" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  }
};
