var bcrypt = require("bcrypt");
const User = require("../model/user");
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

const Users = {
  createUser: async (obj) => {
    try {
      obj.password = bcrypt.hashSync(obj.password, salt);
      const newUser = new User(obj);
      const data = await newUser.save();
      if (data) {
        return data;
      }
      throw data;
    } catch (error) {
      throw error;
    }
  },
  getByEmail: async (email) => {
    try {
      const query = User.findOne({ email });
      return await query.exec();
    } catch (error) {
      throw error;
    }
  },
  getUsers: async (obj) => {
    try {
      const query = User.find(obj).select(
        "_id firstName lastName username role createdAt updatedAt"
      );
      return await query.exec();
    } catch (error) {
      throw error;
    }
  },
  compare: (hash, pass) => {
    return bcrypt.compareSync(pass, hash);
  }
};

module.exports = Users;
