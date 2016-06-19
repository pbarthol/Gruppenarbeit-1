var store = require("../services/notesStore.js");
//var util = require("../util/security");

/*
module.exports.showIndex = function(req, res){
    res.format({
        'text/html': function(){
            res.sendfile("public/index-start.html");
        },
        'application/json': function(){
            res.send({});
        }
    });
};
*/

module.exports.createNote = function(req, res)
{
    res.format({
        'text/html': function(){
            res.render("edit_note");
        },
        'application/json': function(){
            res.send({});
        }
    });

};

module.exports.showNote = function(req, res)
{
    store.get(req.params.id, function(err, note) {
        res.format({
            'text/html': function(){
                res.render("edit_note", note);
            },
            'application/json': function(){
                res.json(note);
            }
        });
    });
};

module.exports.showAllNotes = function(req, res)
{
    store.all( function(err, notes ) {
        res.format({
            'text/html': function(){
                res.render("index", notes);
            },
            'application/json': function(){
                res.json(notes);
            }
        });
    });
};

module.exports.deleteNote =  function (req, res)
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
