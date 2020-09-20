console.log('Starting app');

const fs=require('fs');
const _ = require('lodash');
const { title } = require('process');
const yargs=require('yargs');

const notes=require('./notes.js');

const argv=yargs
.command('add','Add a New Note',{
    title: {
        describe:'Title of Note',
        demand:true,
        alias:'t'
    },
    body: {
        describe:"Body of the Note",
        demand:true,
        alias:'-b'
    }
})
.command('read','To read all the Notes',{
    title: {
        describe:'Title of Note',
        demand:true,
        alias:'t'
    }
})
.command('remove','To remove a particular Note',{
    title: {
        describe:'Title of Note',
        demand:true,
        alias:'t'
    }
})
.command('list','To list all Notes')
.help()
.argv;
var command=process.argv[2];



if(command=='add'){
    var note=notes.addNote(argv.title,argv.body);
    if(note){
        console.log('Note Created');
        console.log('__');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
    else{
        console.log('Note with this title already exists');
    }
    
}
else if(command=='list'){
    var allNotes=notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNotes(note));
}
else if(command=='remove'){
    var noteRemoved=notes.removeNote(argv.title);
    if(noteRemoved){
        console.log(`Note not Found !`);
    }
    else{
        console.log(`Note with Title:${argv.title} removed`);
    }
}
else if(command=='read'){
    var note=notes.getNote(argv.title);
    if(note){
        console.log('Note Found and Read');
        console.log('__');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
    else{
        console.log('Note with this title not found');
    }
}
else{
    console.log('Command Not Recognized');
}