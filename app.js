const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://chikuptdl:xRhrNAFcA87MyVRq@cluster0.nbgwu.mongodb.net/mytoDB');
const app = express();
const ejs = require("ejs")
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("Public"));

const postSchema = new mongoose.Schema({
    message: String
})
const schoolSchema = new mongoose.Schema({
    message: String
})
const officeSchema = new mongoose.Schema({
    message: String
})
const homeSchema = new mongoose.Schema({
    message: String
})
const post = mongoose.model("post", postSchema);
const schoold = mongoose.model("schoold", schoolSchema);
const homed = mongoose.model("homed", homeSchema);
const officed = mongoose.model("officed", officeSchema);
app.get("/", function (req, res) {
    post.find({}, function (err, founditems) {
        res.render("index", { data: founditems })

    })
})
app.post("/", function (req, res) {
    const pola = req.body.input
    const go = new post({
        message: pola
    })
    go.save();
    post.find({}, function (err, founditems) {
        res.render("index", { data: founditems })
    })
    res.redirect("/")
})

app.post("/school", function (req, res) {
    const pleb = req.body.schoolinput
    const blah = new schoold({
        message: pleb
    });
    blah.save();
    schoold.find({}, function (err, founditems) {
        res.render("school", { schooldata: founditems })
    })
    res.redirect("/school");
})

app.get("/about", function (req, res) {
    res.render("about", {})
})
app.get("/contact", function (req, res) {
    res.render("contact", {})
})
app.get("/work", function (req, res){
    officed.find({},function(err,founditems){
        res.render("work",{workdata:founditems})
    });
} );
app.post("/work",function(req,res){
    const miracle= req.body.workinput;
    const fear= new officed({
        message:miracle
    })
    fear.save();
    res.redirect("/work")
})



app.get("/school", function (req, res) {
    schoold.find({}, function (err, founditemsa) {
        res.render("school", { schooldata: founditemsa })
    })
})
app.get("/home", function (req, res){
    homed.find({},function(err,founditems){
        res.render("home",{homedata:founditems})
    })
})
app.post("/home",function(req,res){
    const loda=req.body.bulldog
    const s4=new homed({
        message:loda
    })
    s4.save();
    res.redirect("home");
})


app.post("/deletehome",function(req,res){
 const chkdid=req.body.opa;
     homed.findByIdAndRemove(chkdid,function(err){
         if(err){console.log(err)
        }else{res.redirect("/home")}
     })

 }
)
app.post("/deleteoffice",function(req,res){
    const chkdid=req.body.opa;
        officed.findByIdAndRemove(chkdid,function(err){
            if(err){console.log(err)
           }else{res.redirect("/work")}
        })
   
    }
   )
   app.post("/deleteindex",function(req,res){
    const chkdid=req.body.opa;
        post.findByIdAndRemove(chkdid,function(err){
            if(err){console.log(err)
           }else{res.redirect("/")}
        })
   
    }
   )
   app.post("/deleteschool",function(req,res){
    const chkdid=req.body.opa;
        schoold.findByIdAndRemove(chkdid,function(err){
            if(err){console.log(err)
           }else{res.redirect("/school")}
        })
   
    }
   )







app.listen(3000, function () { console.log("server is live") })