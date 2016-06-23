var store = require("../services/notesStore.js");
//var util = require("../util/security");

module.exports.createNote = function(req, res)
{
    var note = store.add(req.body.id, function(err, note) {
        res.format({
            'text/html': function(){
                res.render("edit_note", note);
            },
            'application/json': function(){
                res.send(note);
            }
        });
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

module.exports.deleteNote = function (req, res)
{
    store.delete( req.params.id, function(err, note) {
        res.format({
            'text/html': function(){
                res.render("shownote", note);
            },
            'application/json': function(){
                res.json(note);
            }
        });
    });
};
