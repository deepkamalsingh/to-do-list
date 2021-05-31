const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["do complete project"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("List", {
    listTitle: day,
    items: items
  });

});


app.get("/Work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    items: workItems
  });
});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list == "Work") {
    workItems.push(item);
    res.redirect("/Work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
