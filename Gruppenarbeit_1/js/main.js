/*
    var notes = [
        {
            "id":"01",
            "finished":true,
            "title":"Lore Ipsum 1",
            "content":"1Bla bla bla bla ",
            "priority":1,
            "dateDue":"2016-06-05",
            "dateEnd":"2016-05-27",
            "dateCreated":"2016-05-20"
        },
        {
            "id":"02",
            "finished":false,
            "title":"Lore Ipsum 2",
            "content":"2Bla bla bla bla ",
            "priority":4,
            "dateDue":"2016-06-04",
            "dateEnd":"",
            "dateCreated":"2016-05-21"
        },
        {
            "id":"03",
            "finished":false,
            "title":"Lore Ipsum 3",
            "content":"3Bla bla bla bla ",
            "priority":2,
            "dateDue":"2016-06-03",
            "dateEnd":"",
            "dateCreated":"2016-05-22"
        }
    ];
*/

var notes = [];


Handlebars.registerHelper('finished_label', function () {
    finished = (this.finished === true) ? "finished" : "not finished";
    return new Handlebars.SafeString(finished);
});

Handlebars.registerHelper('priority_icons', function () {
    priority = "";
    for (p = 0; p < this.priority; p++) {
        priority += "<i class=\"fa fa-bolt fa-fw\"></i>";
    }
    return new Handlebars.SafeString(priority);
});

var filter = 'all';
var sortby = 'dateDue';
var createNotesHtml = Handlebars.compile(document.getElementById("notes-template").innerText);

function getNotesFiltered() {
    if (filter == 'all') {
        return notes;
    }
    else {
        var notesFiltered = [];
        var indexFiltered = 0;
        for (i = 0; i < notes.length; i++) {
            if ((filter == 'undone') && (notes[i].finished === false)) {
                notesFiltered[indexFiltered] = notes[i];
                indexFiltered++;
            }
            if ((filter == 'finished') && (notes[i].finished === true)) {
                notesFiltered[indexFiltered] = notes[i];
                indexFiltered++;
            }
        }
        return notesFiltered;
    }
}

function compareNotesDateDue(s1, s2) {
    return s1.dateDue < s2.dateDue;
}

function compareNotesDateCreated(s1, s2) {
    return s1.dateCreated < s2.dateCreated;
}

function compareNotesPriority(s1, s2) {
    return s1.priority < s2.priority;
}

function showSortedNotes(sb) {
    sortby = (sb) ? sb : sortby;
    switch (sortby) {
        case 'dateDue':
            $("#notes").html(createNotesHtml(getNotesFiltered().sort(compareNotesDateDue)));
            break;
        case 'dateCreated':
            $("#notes").html(createNotesHtml(getNotesFiltered().sort(compareNotesDateCreated)));
            break;
        case 'priority':
            $("#notes").html(createNotesHtml(getNotesFiltered().sort(compareNotesPriority)));
            break;
    }
}

function renderNotes() {
    /*
    $.ajax({
    dataType: "json",
    url: 'notes.json',
    data: notes,
    success: function (notes) {
        $.each( notes, function (n) {
            $("notes").push(n);
        });
    }});
*/
    console.log("begin rendernotes");
    var allNotes = [];
    console.log("begin load json");

    // Get JSON-formatted data from the server
    $.getJSON( 'notes.json', function( data ) {

        // Log each key in the response data
        $.each( data.notes,
            /*
            function( key, value ) {
                console.log( key + " : " + value );
            }
            */
            function (index) {
                allNotes.push(data[index]);
            }
        );
    })

    console.log("end load json");
    var notesinfo;
    allNotes.forEach(function(index){Notesinfo  += allNotes[inex].id + ","});
    console.log("allnotes=" +notesinfo);
    showSortedNotes(allNotes);
    console.log("end rendernotes");

}

$(function () {
    $("#ic-setting").on("click", function () {
        $("#header-setting").slideToggle(500);
    });

    $("#btn-finish-date").on("click", function () {
        $("#btn-finish-date").addClass("active");
        $("#btn-create-date, #btn-importance").removeClass("active");
        showSortedNotes("dateDue");
    });

    $("#btn-create-date").on("click", function () {
        $("#btn-create-date").addClass("active");
        $("#btn-finish-date, #btn-importance").removeClass("active");
        showSortedNotes("dateCreated");
    });

    $("#btn-importance").on("click", function () {
        $("#btn-importance").addClass("active");
        $("#btn-finish-date, #btn-create-date").removeClass("active");
        showSortedNotes("priority");
    });

    $("#btn-finished-tasks").on("click", function () {
        $("#btn-finished-tasks").addClass("active");
        $("#btn-undone-tasks").removeClass("active");
        filter = "finished";
        showSortedNotes();
    });

    $("#btn-undone-tasks").on("click", function () {
        $("#btn-undone-tasks").addClass("active");
        $("#btn-finished-tasks").removeClass("active");
        filter = "undone";
        showSortedNotes();
    });

    $("#style-switcher").on("change", function () {
        $("#pagestyle").attr("href", this.value);
    });
    renderNotes();
});