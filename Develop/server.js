const express=require("express");
const path = require("path");

let notes = require("./db/db.json")

const app = express();
const PORT= process.env.PORT || 8080;
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// below says all static files are in public folder
app.use(express.static("public"));
//app.use("/api", apiRoutes);
//app.use("/",htmlRoutes);
//
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/public/index.html"))
});
app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"))
});

app.get("/api/notes",function(req,res){


    fs.readFile('./db/db.json', 'utf8', function(err, data){
        console.log('did  it work ?? read file ??', JSON.parse(data), err)
        res.json(JSON.parse(data))
    })


});

app.post("/api/notes",function(req,res){
    console.log('we hi the /api/notes post route!!!', req.body)
    req.body.id = notes.length+1

    // first fs.readFile to get array
        // inside of readFIle do the push thing and push req.body to array we just read in!
        // then do a quick fs.writeFile 


    notes.push(req.body)
    res.json(notes)
})

app.delete("/api/notes/:id",function(req,res){
    console.log("WE HIT THE DELETE ROUTE", req.params);
    console.log('array of all the note!! need to delte one form here!!', notes)


    // FIRST do a fs.ReadFIle to get array
    // then do all ur good deleting stuff!!

            // an empty array!!
            var newNotes = []
            
            //for loop thru all the notes!!
                // we'l have if in the for loop checking
                // if this dudes id matches the id we wanna delete
                // fill up the empty array above for loop with the ppl we wanna keep
            for (let i = 0; i < notes.length; i++) {

                console.log('Id we want to  delete!!!', req.params.id)
                console.log("is it equal to this single dudes id ??", notes[i].id);

                if(parseInt(req.params.id) === notes[i].id){
                    console.log("WE FOUND A MATCH - time to delte this dude", notes[i]);
                }
                else{
                    newNotes.push(notes[i])
                }
            }

            console.log('new notes ?? should b everyone minus dude we wanted to delete', newNotes)
            // INSDEAD of doiing this little reassign thing notes=Newnotes
                // you are goin gto do a fs.writeFile instead
            notes = newNotes
            res.json(notes)
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`LISTENING ON PORT: ${PORT}`));