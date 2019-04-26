const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const public = express.static(__dirname + "/public");
const fullCalendar = express.static(__dirname + "/node_modules/@fullcalendar");
const exphbs = require("express-handlebars");
const handlebars = express.static(__dirname + "/node_modules/handlebars");
const fs = express.static(__dirname + "/node_modules/fs.realpath")

app.use("/public", public);
app.use("/@fullcalendar", fullCalendar);
app.use("/handlebars", handlebars);
app.use("/fs", fs);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("", router);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});