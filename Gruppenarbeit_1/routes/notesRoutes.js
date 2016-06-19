var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
//var util = require('../util/security');


//router.all("/", notes.showAllNotes);
router.get("/", notes.showAllNotes);
router.post("/", notes.createNote);
router.get("/:id/", notes.showNote);
router.delete("/:id/", notes.deleteNote);

module.exports = router;