var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

/*
var notes_for_db =
[

    {
        "id": 1,
        "finished": true,
        "title": "Lore Ipsum 1",
        "content": "1Bla bla bla bla ",
        "priority": 1,
        "dateDue": "2016-06-05",
        "dateEnd": "2016-05-27",
        "dateCreated": "2016-05-20"
    },
    {
        "id": 2,
        "finished": false,
        "title": "Lore Ipsum 2",
        "content": "2Bla bla bla bla ",
        "priority": 4,
        "dateDue": "2016-06-04",
        "dateEnd": "",
        "dateCreated": "2016-05-21"
    },
    {
        "id": 3,
        "finished": false,
        "title": "Lore Ipsum 3",
        "content": "3Bla bla bla bla ",
        "priority": 2,
        "dateDue": "2016-06-03",
        "dateEnd": "",
        "dateCreated": "2016-05-22"
    }
];

notes_for_db.forEach(function(note) {
    db.insert(note, function (err, newDoc) {
    });
})
*/

function Note(id, finished, title, content, priority, dateDue, dateEnd, dateCreated)
{
    this.id = id;
    this.finished = finished;
    this.title = title;
    this.content = content;
    this.priority = priority;
    this.dateDue = dateDue;
    this.dateEnd = dateEnd;
    this.dateCreated = dateCreated;
}


function publicAddNote(id, finished, title, content, priority, dateDue, dateEnd, dateCreated, callback)
{
    var note = new Note(id, finished, title, content, priority, dateDue, dateEnd, dateCreated);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id }, {}, function (err, count) {
        publicGet(id, callback);
    });
}

function publicGet(id, callback)
{
    db.findOne({ id: id, }, function (err, doc) {
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

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll};