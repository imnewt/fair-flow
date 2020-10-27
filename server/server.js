var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
// var recipes = require("./routes/recipes");
var users = require("./routes/users");

var app = express();
var port = 3000;

app.listen(port, function(){
    console.log(`Server running in port ${port}`)
})

//views
app.set("views",  path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//Routes
app.use("/", index);
// app.use("/api", recipes);
app.use("/api", users);