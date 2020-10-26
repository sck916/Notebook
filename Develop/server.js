// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

let notes = require("./db/db.json");

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// below says all static files are in public folder
app.use(express.static("public"));

// Routes to index.hml
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Routes to notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        if (err) {
            console.log("Error");
        } else {
            console.log("did  it work ?? read file ??", JSON.parse(data), err);
            res.json(JSON.parse(data));
        }
    })
});

//Post user input 
 // first fs.readFile to get array
  // inside of readFIle do the push thing and push req.body to array we just read in!
  // then do a quick fs.writeFile
app.post("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        console.log("we hi the /api/notes post route!!!", req.body);

        let oldNotes = JSON.parse(notes);
        req.body.id = oldNotes.length + 1;
        oldData.push(req.body);
        

        fs.writeFile('./db/db.json', JSON.stringify(oldNotes), function(err) {
            console.log(err);
            res.json(oldNotes);
        })    
    })
});

app.delete("/api/notes/:id", function (req, res) {
  fs.readFile('./db/db.json', 'utf8', function(err, data) {
    console.log('this is the ID we wanna delete',req.params);
    let oldNotes = JSON.parse(notes);
  // FIRST do a fs.ReadFIle to get array
  // then do all ur good deleting stuff!!

  // an empty array!!
  var newNotes = [];

  //for loop thru all the notes!!
  // we'l have if in the for loop checking
  // if this dudes id matches the id we wanna delete
  // fill up the empty array above for loop with the ppl we wanna keep
  for (let i = 0; i < notes.length; i++) {
    console.log("Id we want to  delete!!!", req.params.id);
    console.log("is it equal to this single dudes id ??", notes[i].id);

    if (parseInt(req.params.id) === notes[i].id) {
      console.log("WE FOUND A MATCH - time to delte this dude", notes[i]);
    } else {
      newNotes.push(notes[i]);
    }
  }

  console.log(
    "new notes ?? should b everyone minus dude we wanted to delete",
    newNotes
  );
  // INSDEAD of doing this little reassign thing notes=Newnotes
  // you are goin gto do a fs.writeFile instead
//   notes = newNotes;
//   res.json(notes);
// });
fs.writeFile('./db/db.json', JSON.stringify(newData), function(err) {
    console.log(err);
    res.json(newData);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});
