console.log("Starting Notes");
const fs=require('fs');
const { clearScreenDown } = require('readline');
function logNotes(note){
    console.log('___________________');
    console.log();
    console.log(`Title: ${note.title}`);
    console.log();
    console.log(`Body:${note.body}`);
    console.log();
}
var fetchNotes = () =>{
    try{
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
};
var saveNotes = (notes) =>{
    fs.writeFileSync("notes-data.json",JSON.stringify(notes));
}

var addNote = (title,body) => {
    var notes = fetchNotes();
    var xyz = [];
    var note={
        title,
        body
    };
    function checkdup(note){
        return note.title===title;
    }
    var duplicatesNotes = notes.filter(checkdup);
    if(duplicatesNotes.length === 0)
    {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};
var getAll = () => {
    return fetchNotes();
};
var getNote = (title) => {
    var notes=fetchNotes();
    function checkdup(note){
        return note.title===title;
    }
    var filteredNotes = notes.filter(checkdup);
    return filteredNotes[0];
};
var removeNote = (title) => {
    var notes=fetchNotes();
    
    function checkdup(note){
        return note.title!==title;
    }
    var filteredNotes = notes.filter(checkdup);
    saveNotes(filteredNotes);
    return notes.length===filteredNotes.length;

};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNotes
};