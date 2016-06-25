function ajaxGetAllNotes(sb) {

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    $.ajax({
        dataType: "json",
        method: "GET",
        url: "/notes",
        //data: { id : 1 }
    }).done(function (msg) {
        notes = msg;
        // change dateDue in each note
        for (i = 0; i < notes.length; i++) {
            /*
            var note = notes[i];
            var dateAsString = note.dateDue;
            var month = note.dateDue.substring(5,7);
            month = parseInt(month);
            var day = note.dateDue.substring(8,10);
            var year = note.dateDue.substring(0,4);
            notes[i].dateDue = day + " " + monthNames[month-1] + ", " + year;
            */
            notes[i].dateDue = notes[i].dateDue.substring(8,10) + " " + monthNames[parseInt(notes[i].dateDue.substring(5,7))-1] + ", " + notes[i].dateDue.substring(0,4);
        }
        if ((notes) && (notes.length > 0)) {
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
        } else {
            notes = [];
            $("#notes").html("<p>No notes found.</p>");
        }
    });
}

function ajaxSaveNote(note) {
    // two functions:
    // If note._id = "newNote" -> insert new Note
    // Else -> update Note
    if (note._id === "newNote") {
        $.ajax({
            dataType: "json",
            method: "POST",
            contentType: 'application/json',
            url: "/note/",
            data: JSON.stringify({"note": note})
        }).done(function (msg) {
            //note = jQuery.parseJSON(msg);
            //renderEditor(note);
            $("#note-editor").hide();
            $("main").show();
            $("#header-sorting").show();
            renderSortedNotes();
        }).fail(function (msg) {
            output.text(JSON.stringify(msg));
        });
    }
    else {
        $.ajax({
            dataType: "json",
            method: "PUT",
            contentType: 'application/json',
            url: "/note/",
            data: JSON.stringify({"note": note})
        }).done(function (msg) {
            $("#note-editor").hide();
            $("main").show();
            $("#header-sorting").show();
            renderSortedNotes();
        }).fail(function (msg) {
            output.text(JSON.stringify(msg));
        });
    }
}

function ajaxDeleteNote(note){
    $.ajax({
        dataType: "json",
        method: "POST",
        contentType: 'application/json',
        url: "/note/delete",
        data: JSON.stringify({"note": note})
    }).done(function (msg) {
    }).fail(function (msg) {
    });
    $("#note-editor").hide();
    $("main").show();
    $("#header-sorting").show();
    renderSortedNotes();

}


