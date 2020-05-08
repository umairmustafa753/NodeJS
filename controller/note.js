const Note = require("../model/note");
const NotesFromService = require("../services/note");

exports.getAllNotes = async (req, res) => {
  try {
    Note.find()
      .then((Notes) => {
        res.status(200).json({ Notes: Notes });
      })
      .catch((err) => console.log("error message: ", err));
  } catch (error) {
    res.status(500).send({ error: "Please try again" });
  }
};

exports.getUserNotes = async (req, res) => {
  try {
    Note.find({ userid: req.params.id })
      .select("id userid title body time")
      .then((Notes) => {
        res.status(200).json({ Notes: Notes });
      })
      .catch((err) => console.log("error message: ", err));
  } catch (error) {
    res.status(500).send({ message: "Please try again" });
  }
};

exports.createNote = (req, res) => {
  const noteBody = {
    userid: req.body.userid,
    title: req.body.title,
    body: req.body.body
  };
  try {
    const note = new Note(noteBody);
    note.save().then((result) => {
      res.status(200).json({
        Note: result,
        message: "Note created Succesfully"
      });
    });
  } catch (error) {
    res.status(500).send({ error: "Please try again" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    let note = await NotesFromService.getById(req.body._id);
    if (!note) {
      return res.status(404).send({ data: {}, message: "Note Not found" });
    }
    const query = { _id: req.body._id };
    const options = { new: true, runValidators: true };
    const update = {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    };
    let item = await Note.findOneAndUpdate(query, update, options);
    if (item) {
      return res
        .status(200)
        .send({ data: item, message: "Note updated Successfully" });
    }
    return res.status(409).send({ data: {}, message: "Note not updated." });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ error });
  }
};

exports.removeNote = (req, res) => {
  try {
    Note.deleteOne({ _id: req.params.id }, function (err) {
      if (err) res.status(500).send({ error: "Please try again" });
      else {
        res
          .status(200)
          .send({ data: {}, message: "Note deleted Successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ error: "Please try again" });
  }
};
