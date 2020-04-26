const Note = require("../model/note");

exports.getNote = (req, res) => {
  Note.find()
    .select("title body time")
    .then((Notes) => {
      res.status(200).json({ Notes: Notes });
    })
    .catch((err) => console.log("error message: ", err));
};

exports.createNote = (req, res) => {
  const note = new Note(req.body);
  note.save().then((result) => {
    res.status(200).json({
      Note: result
    });
  });
};

exports.removeNote = (req, res) => {
  Note.deleteOne({ _id: req.params.id }, function (err) {
    if (err) res.status(500).send({ error: "Please try again" });
    else {
      res.status(200).send({ data: {}, message: "Item deleted Successfully" });
    }
  });
};
