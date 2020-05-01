const Note = require("../model/note");

const Notes = {
  getById: async (id) => {
    const query = Note.findById(id);
    try {
      return await query
        .populate(
          "sentBy",
          "_id firstName lastName email username role createdAt updatedAt"
        )
        .exec();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
};

module.exports = Notes;
