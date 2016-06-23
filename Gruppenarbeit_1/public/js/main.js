var notes = [];

function Note() {
    this.id = createUID();
    this.finished = false;
    this.title = "";
    this.content = "";
    this.priority = 0;
    this.dateDue = "";
    this.dateEnd = "";
    this.dateCreated = "";
}

Handlebars.registerHelper("finished_label", function () {
    finished = (this.finished === true) ? "finished" : "not finished";
    return new Handlebars.SafeString(finished);
});

Handlebars.registerHelper("finished_button", function (note_id) {
    button = ( this.finished ) ? "<i class=\"fa fa-check fa-fw\"></i>" : "";
    finished_btn = "<button class=\"button finished_button\" name=\"finished\" id=\"{{this._id}}_finished\" onclick=\"changeNoteItem('" + note_id + "','finished'," + !this.finished+ "); renderEditor('" + note_id + "') \">" + button + "</button>";
    return new Handlebars.SafeString(finished_btn);
});

Handlebars.registerHelper("priority_icons", function () {
    priority = "";
    for (p = 0; p < this.priority; p++) {
        priority += "<i class=\"fa fa-bolt fa-fw  prio-active \"></i>";
    }
    return new Handlebars.SafeString(priority);
});

Handlebars.registerHelper("priority_icons_edit", function (note_id) {
    priority_edit = "";
    var prio_num, prio_num_invert, class_prio_active;
    for (p = 0; p < 5; p++) {
        prio_num = p+1;
        class_prio_active = ( p < this.priority ) ? " prio-active" : "";
        priority_edit += "<a href=\"javascript:void(0)\" onclick=\"changeNoteItem('" + note_id + "','priority'," + prio_num + "); renderEditor('" + note_id + "') \" class=\"fa fa-bolt fa-fw" + class_prio_active + "\" id=\"priority-edit-" + prio_num + "\"></a>";
    }
    return new Handlebars.SafeString(priority_edit);
});

Handlebars.registerHelper("button_edit", function (note_id) {
    var button_content = "<i class=\"fa fa-pencil fa-fw\"></i>";
    var button = $("<button class=\"button\" id=\"btn_edit_" + note_id +  "\"></button>").html(button_content).attr("onclick", "renderEditor('" + note_id + "')");
    return $('<div></div>').append(button).html()     ;
});

Handlebars.registerHelper("button_finish", function (note_id) {
    var button_content = "<i class=\"fa fa-check fa-fw\"></i>";
    var button = (!this.finished)? $("<button class=\"button\" id=\"btn_finish_" + note_id +  "\"></button>").html(button_content).attr("onclick", "changeNoteItem('" + note_id + "','finished'," + !this.finished+ "); saveNotes()") : $("<button class=\"button\" id=\"btn_finish_" + note_id +  "\"></button>").html(button_content).addClass("invisible").attr("disabled","disabled");
    return $('<div></div>').append(button).html();
});

var filter = 'all';
var sortby = 'dateDue';
var createNotesHtml = Handlebars.compile(document.getElementById("notes-template").innerText);
var createEditorHtml = Handlebars.compile(document.getElementById("editor-template").innerText);

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

function createUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function getNoteByID(id) {
    if (id > '0') {
        for (i = 0; i < notes.length; i++) {
            if (notes[i]._id == id) {
                return notes[i];
            }
        }
    } else {
        // create new note
        var note = new Note();
        notes.push(note);
        return note;
    }
}

function changeNoteItem(id,name,value) {
    for (i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            notes[i][name] = value;
        }
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

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    $("#note-editor").hide();
    $("main").show();
    $("#header-sorting").show();
    renderSortedNotes();
}

function quitEditor() {
    $("#note-editor").hide();
    $("main").show();
    $("#header-sorting").show();
    renderSortedNotes();
}

function deleteNote(id) {
    for (i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            notes.splice(i,1);
        }
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    $("#note-editor").hide();
    $("main").show();
    $("#header-sorting").show();
    renderSortedNotes();
}

function renderSortedNotes(sb) {
    //var objNotes = JSON.parse(localStorage.getItem("notes"));
    //notes = objNotes;
    //var token = undefined;
    console.log(notes);
    if ( (notes) && (notes.length > 0) ) {
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
}

function renderEditor(id) {
    var note = (id > "") ? getNoteByID(id) : getNoteByID(0);
    // get Note from server
    /*
    $.ajax({
        dataType:  "json",
        method: "GET",
        url: "/notes/edit/" + id,
        //data: { id : id }
        // The generated request url looks like: Request URL:http://127.0.0.1:3001/notes/edit/2IPojvnomnWyLdOc
    }).done(function( msg ) {
        notes = msg;
    });
    */
    
    $("main").hide();
    $("#header-sorting").hide();
    $("#note-editor").show().html(createEditorHtml(note));
    $(".datepicker").pickadate({
        formatSubmit: 'yyyy-mm-dd',
        hiddenName: true
    });
    $("#note-delete").hide();
}

$(function () {


    $.ajax({
        dataType:  "json",
        method: "GET",
        url: "/notes",
        //data: { id : 1 }
    }).done(function( msg ) {
        notes = msg;

        renderSortedNotes();
    });
    /*.fail(function( msg ) {
     $("#notes").html("<p>JSON.stringify(msg)</p>");
     //output.text(JSON.stringify(msg));
     });
     */
    renderSortedNotes();

    $("#header-setting").hide();
    $("#note-editor").hide();

    $("#ic-setting").on("click", function () {
        $("#header-setting").slideToggle(500);
    });

    $("#ic-create").on("click", function () {
        renderEditor();
    });

    $("#btn-finish-date").on("click", function () {
        $("#btn-finish-date").addClass("active");
        $("#btn-create-date, #btn-importance").removeClass("active");
        renderSortedNotes("dateDue");
    });

    $("#btn-create-date").on("click", function () {
        $("#btn-create-date").addClass("active");
        $("#btn-finish-date, #btn-importance").removeClass("active");
        renderSortedNotes("dateCreated");
    });

    $("#btn-importance").on("click", function () {
        $("#btn-importance").addClass("active");
        $("#btn-finish-date, #btn-create-date").removeClass("active");
        renderSortedNotes("priority");
    });

    $("#btn-finished-tasks").on("click", function () {
        $("#btn-finished-tasks").addClass("active");
        $("#btn-undone-tasks").removeClass("active");
        $("#btn-all-tasks").removeClass("active");
        filter = "finished";
        renderSortedNotes();
    });

    $("#btn-undone-tasks").on("click", function () {
        $("#btn-undone-tasks").addClass("active");
        $("#btn-finished-tasks").removeClass("active");
        $("#btn-all-tasks").removeClass("active");
        filter = "undone";
        renderSortedNotes();
    });

    $("#btn-all-tasks").on("click", function () {
        $("#btn-all-tasks").addClass("active");
        $("#btn-undone-tasks").removeClass("active");
        $("#btn-finished-tasks").removeClass("active");
        filter = "all";
        renderSortedNotes();
    });

    $("#style-switcher").on("change", function () {
        $("#pagestyle").attr("href", this.value);
    });

});