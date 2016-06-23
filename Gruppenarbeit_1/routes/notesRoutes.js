var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
//var util = require('../util/security');


//router.all("/", notes.showAllNotes);
router.get("/notes", notes.getAllNotes);
router.put("/note", notes.updateNote);
router.get("/notes/edit/:id/", notes.getNote);
router.delete("/notes/:id/", notes.deleteNote);

module.exports = router;