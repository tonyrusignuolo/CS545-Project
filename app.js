const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes");
const exphbs = require("express-handlebars");
const handlebars = express.static(__dirname + "/node_modules/handlebars");
const assets = express.static(__dirname + "/assets")
const fs = express.static(__dirname + "/node_modules/fs.realpath")
const fullCalendar = express.static(__dirname + "/node_modules/@fullcalendar");
const tooltip = express.static(__dirname + "/node_modules/tooltip.js");
const popper = express.static(__dirname + "/node_modules/popper.js");
const public = express.static(__dirname + "/public");

const handlebarsInstance = exphbs.create({
	extname: 'hbs',
	defaultLayout: "main",
	helpers: {
		// Get amount of keys in an object
		size: (obj) => {
			let size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		},
		asJSON: (obj, spacing) => {
			if (typeof spacing === "number")
				return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

			return new Handlebars.SafeString(JSON.stringify(obj));
		},
		debug: (value) => {
			console.log("Current Context");
			console.log("====================");
			console.log(this);

			if (value) {
				console.log("Value");
				console.log("====================");
				console.log(value);
			}
		},
		not: (option, options) => {
			return !option;
		},
		ifEqual: (arg1, arg2, options) => {
			return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
		},
		ifOr: (arg1, arg2, options) => {
			return (arg1 || arg2) ? options.fn(this) : options.inverse(this);
		}
	},
});

// app.use("/public", public);
app.use("/assets", assets);
app.use("/fs", fs);
app.use("/@fullcalendar", fullCalendar);
app.use("/handlebars", handlebars);
app.use("/popper", popper);
app.use("/public", public);
app.use("/tooltip", tooltip);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use("", router);

app.engine('hbs', handlebarsInstance.engine);
app.set("view engine", "hbs");

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});