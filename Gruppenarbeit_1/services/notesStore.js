var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(id, finished, title, content, priority, dateDue, dateEnd, dateCreated)
{
    this._id = id;
    this.finished = finished;
    this.title = title;
    this.content = content;
    this.priority = priority;
    this.dateDue = dateDue;
    this.dateEnd = dateEnd;
    this.dateCreated = dateCreated;
}

function createUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function publicUpdateNote(note, callback)
{
    var note = note;
    db.remove({_id: note._id}, {}, function(err, numRemove){
        // Get a new UID
        note._id = createUID();
        db.insert(note, function(err, newDoc){
            if (callback) {
                callback(err, newDoc);
            }
        });
    });
}

function publicAddNote(note, callback)
{
    // Get a new UID
    note._id = createUID();
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(note, callback) {
    db.remove({_id: note._id}, {}, function(err, numRemove){
        if(callback){
            callback(err, numRemove);
        }
    });
}

function publicGet(id, callback)
{
    db.findOne({ _id: id, }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, docs) {
        //callback( err, docs);
       callback( err, docs );
    });
}

module.exports = {add: publicAddNote, update : publicUpdateNote, delete : publicRemove, get : publicGet, all : publicAll};