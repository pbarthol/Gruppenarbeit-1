var store = require("../services/notesStore.js");

module.exports.addNote = function(req, res)
{
    var note = store.add(req.body.note, function(err, note) {
        res.send(note);
    });
};

module.exports.updateNote = function(req, res)
{
    var note_json = req.body.note;
    var note = store.update(note_json, function(err, note) {
        res.send(note);
    });
};

module.exports.deleteNote = function(req, res)
{
    var note_json = req.body.note;
    var note = store.delete(note_json, function(err, note) {
        res.send(note);
    });
};

module.exports.getNote = function(req, res)
{
    store.get(req.params.id, function(err, note) {
        var note = note;
        res.json(note);
    });
};

module.exports.getAllNotes = function(req, res)
{
    store.all( function(err, notes ) {
        var notes = notes;
        res.json(notes);
    });
};

