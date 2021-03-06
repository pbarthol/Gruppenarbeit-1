var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');
//var util = require('../util/security');


//router.all("/", notes.showAllNotes);
router.get("/notes", notes.getAllNotes);
router.put("/note", notes.updateNote);
router.post("/note", notes.addNote);
router.get("/notes/edit/:id/", notes.getNote);
router.post("/note/delete", notes.deleteNote);

module.exports = router;