
 var notes_for_json =
 //{"notes": */
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
 ]
 /*};*/


 //var notes = [];

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

function getNotesFiltered(filter) {
    var notes = JSON.parse(localStorage.getItem('notes'));

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

function showFilteredAndSortedNotes(sortBy) {
//function showFilteredAndSortedNotes(filter, sortBy) {
    
    //sortby = (sb) ? sb : sortby;
    var filtered_notes = [];
    //var classes = $("#btn-all").attr("class");
    var classlist = $("#btn-all").attr("class").split(' ');
    if (classlist.indexOf("active") > -1)
    //if ($("#btn-all").getElementsByClassName("active"))
    //if (document.getElementById("#btn-all").getElementsByClassName("active").length > 0)
        filtered_notes = getNotesFiltered('all');
    classlist = $("#btn-undone-tasks").attr("class").split(' ');
    if (classlist.indexOf("active") > -1)
        filtered_notes = getNotesFiltered('undone');
    classlist = $("#btn-finished-tasks").attr("class").split(' ');
    if (classlist.indexOf("active") > -1)
        filtered_notes = getNotesFiltered('finished');
    
    // Find active Order By Button (Filter)
    //if ($("#btn-create-date").getElementsByClassName("active"))
    classlist = $("#btn-create-date").attr("class").split(' ');
    if (classlist.indexOf("active") > -1)
        // sort by create date
        $("#notes").html(createNotesHtml(filtered_notes.sort(compareNotesDateCreated)));
    classlist = $("#btn-finish-date").attr("class").split(' ');
    if (classlist.indexOf("active") > -1)
        // Sort by finished date
        $("#notes").html(createNotesHtml(filtered_notes.sort(compareNotesDateDue)));
    classlist = $("#btn-importance").attr("class").split(' ');
    if (classlist.indexOf("active")>-1)
        // Sort by Priority
        $("#notes").html(createNotesHtml(filtered_notes.sort(compareNotesPriority)));

 }

function openNewNotDialog(){
    window.location.href = "edit_note.html?note-di=NEW";
}

 function editNote(noteId) {
     window.location.href = "edit_note.html?note-id=" + (noteId).toString();
 }

function renderNotes() {
    showFilteredAndSortedNotes();
    console.log("end rendernotes");

}

$(function () {
    $("#ic-setting").on("click", function () {
        $("#header-setting").slideToggle(500);
    });

    $("#btn-add-note").on("click", function () {
        openNewNotDialog()});

    $("#btn-all").on("click", function () {
        $("#btn-all, #btn-create-date").addClass("active");
        $("#btn-finish-date, #btn-importance, #btn-undone-tasks, #btn-finished-tasks").removeClass("active");
        renderNotes()});

    $("#btn-finished-tasks").on("click", function () {
        $("#btn-finished-tasks, #btn-finish-date").addClass("active");
        $("#btn-all, #btn-undone-tasks, #btn-create-date, #btn-importance").removeClass("active");
        filter = "finished";
        renderNotes()});

    $("#btn-undone-tasks").on("click", function () {
        $("#btn-undone-tasks, #btn-create-date").addClass("active");
        $("#btn-all, #btn-finished-tasks, #btn-finish-date, #btn-importance").removeClass("active");
        filter = "undone";
        renderNotes()});
    $("#btn-finish-date").on("click", function () {
        $("#btn-finish-date").addClass("active");
        $("#btn-create-date, #btn-importance").removeClass("active");
        renderNotes()});

    $("#btn-create-date").on("click", function () {
        $("#btn-create-date").addClass("active");
        $("#btn-finish-date, #btn-importance").removeClass("active");
        renderNotes()});

    $("#btn-importance").on("click", function () {
        $("#btn-importance").addClass("active");
        $("#btn-finish-date, #btn-create-date").removeClass("active");
        renderNotes()});

    $("#style-switcher").on("change", function () {
        $("#pagestyle").attr("href", this.value);
    });
    // activate all button and filter by create date
    $("#btn-all").addClass("active");
    $("#btn-create-date").addClass("active");
    //notes = notes_json["notes"];
    localStorage.setItem('notes', JSON.stringify(notes_for_json));
    renderNotes();
}); 