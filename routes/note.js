import express from "express";
import Note from "./../models/note";

const router = express.Router();
const ENTRYPOINT = "/note";

router.get(`${ENTRYPOINT}`, async (req, res) => {
  try {
    const notesDB = await Note.find();

    res.json(notesDB);
  } catch (error) {
    return res.status(400).json({
      message: "Internal error",
      error
    });
  }
});

router.get(`${ENTRYPOINT}/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    const noteDB = await Note.findOne({ _id: id });

    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "Internal error",
      error
    });
  }
});

router.post(`${ENTRYPOINT}`, async (req, res) => {
  const body = req.body;

  try {
    const noteDB = await Note.create(body);

    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "Internal error",
      error
    });
  }
});

router.delete(`${ENTRYPOINT}/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    const noteDB = await Note.findByIdAndDelete({ _id: id });

    if (!noteDb) {
      return res.status(400).json({
        message: "That note does not exist",
        error
      });
    }

    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "Internal error",
      error
    });
  }
});

router.put(`${ENTRYPOINT}/:id`, async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const noteDB = await Note.findByIdAndUpdate({ _id: id }, body, {
      new: true
    });

    res.json(noteDB);
  } catch (error) {
    return res.status(400).json({
      message: "Internal error",
      error
    });
  }
});

module.exports = router;
