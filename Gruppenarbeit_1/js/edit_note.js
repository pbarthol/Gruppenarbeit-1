function saveNote(){
    // find out add new note or edit note
    var notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(document.getElementById("name").value);
    sessionStorage.setItem("users", JSON.stringify(users));
}

function addNewNote(){
    pass;
}

function goBackToOverview(){
    window.location.replace("index.html");
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}

$(function () {
    $("#btn-save").on("click", function () {
        saveNote()});
    $("#btn-cancel").on("click", function () {
        goBackToOverview()});
    var noteId = $.urlParam('note-id');
    if ( noteId === "NEW" ) {
        addNewNote();
    }
    else {
        // get Note Data
        var notes = JSON.parse(localStorage.getItem("notes"));
        notes.forEach(function (note) {
            if ( note.id === parseInt(noteId) ) {
                $("#note-title").val(note.title);
                $("#note-description").val(note.content);
            }
        })
    }
}); 