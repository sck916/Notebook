const express=require("express");
const path = require("path");

const notes =[{

}]

const app = express();
const PORT= process.env.PORT || 8080;

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
    res.json(notes)
});

// app.post("/api/notes",function(req,res){
//     res.json(notes)
// })

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`LISTENING ON PORT: ${PORT}`));