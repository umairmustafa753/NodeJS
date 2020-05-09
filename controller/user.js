const UserFromService = require("../services/user");
const User = require("../model/user");

module.exports = {
  GetUsers: async (req, res) => {
    try {
      let user = await UserFromService.getUsers({ role: "S" });
      if (user) {
        return res.status(200).send({ data: { user }, message: "" });
      }
      return res.status(404).send({ data: { user }, message: "" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ error });
    }
  },

  removeUser: (req, res) => {
    try {
      User.deleteOne({ _id: req.params.id }, function (err) {
        if (err) res.status(500).send({ error: "Please try again" });
        else {
          res
            .status(200)
            .send({ data: {}, message: "User deleted Successfully" });
        }
      });
    } catch (error) {
      res.status(500).send({ error: "Please try again" });
    }
  }
};
