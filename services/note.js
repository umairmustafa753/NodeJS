const Note = require("../model/note");

const Notes = {
  getById: async (id) => {
    const query = Note.findById(id);
    try {
      return await query.exec();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  getByEmail: async (email) => {
    try {
      const query = Note.findOne({ email });
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Notes;
