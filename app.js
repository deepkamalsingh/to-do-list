const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["do complete project"];
var workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

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
  var item = req.body.newItem;
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
