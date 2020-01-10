const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop/public"));

allNotes = [{"title":"Example Note","text":"I am the first example note!", "id" : 0}];
nextNoteId = 1;


app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
})

app.get('/api/notes',(req,res)=>{
    //table data route
    //res.sendFile(path.join(__dirname, "Develop/db/db.json"));
    res.send(allNotes);
})



app.post('/api/notes', (req,res)=>{
    const newNote = req.body;
    newNote.id= nextNoteId;
    nextNoteId= nextNoteId+1;

    allNotes.push(newNote);
    
    res.send(allNotes);
})

app.delete('/api/notes/:id',(req,res)=>{
    console.log(req.params.id);

    id = Number(req.params.id)
    allNotes = allNotes.filter(function(note, index, arr){
        return note.id != id; 
    })



    res.send(allNotes);

})


// notes = read the JSON file here
// notes = JSON.parse(fs.readFileSync('Develop/db/db.json'))
//write notes to JSON file.
//fs.writeFileSync('Develop/db/db.json', JSON.stringify(notes));
//res.sendFile(path.join(__dirname, "Develop/db/db.json"))



app.get('/',(req,res)=>{
    // will serve tables page
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
})



app.get('*',(req,res)=>{
    // will serve tables page
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
})










app.listen(PORT,function(){
    console.log('server listening!');
})