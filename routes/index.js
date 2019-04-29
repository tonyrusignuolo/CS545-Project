const router = require("express").Router();
const eventData = require('../data').events;
const Handlebars = require('handlebars');
const fs = require('fs');

router.get("", async (req, res) => {
	try {
		let options = {
			title: "Main Page",
			pageType: "dashboard-page"
		};
		res.render("partials/pages/landing", options);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.get("/login", async (req, res) => {
	try {
		let options = {
			title: "Login",
		};
		res.render("partials/pages/login", options);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.get("/startForm", async (req, res) => {
	try {
		let options = {
			title: "Start Form",
			pageType: "dashboard-page",
			classes: ['0']
		};
		res.render("partials/pages/startForm", options);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.post("/startform", async (req, res) => {
	try {
		// step 1
		let userName = req.body.userName;
		let userEmail = req.body.userEmail;
		let userPassword = req.body.userPassword;

		// step 2
		let numCourses = req.body.numCourses;
		calendar_events = [];
		for (let i = 0; i <= numCourses; ++i) {
			let courseNumber = req.body["courseNumber-"+i];
			let courseName = req.body["courseName-"+i];

			let courseMonday = req.body["courseMonday-"+i];
			let courseTuesday = req.body["courseTuesday-"+i];
			let courseWednesday = req.body["courseWednesday-"+i];
			let courseThursday = req.body["courseThursday-"+i];
			let courseFriday = req.body["courseFriday-"+i];

			let courseStartTime = req.body["courseStartTime-"+i];
			let courseEndTime = req.body["courseEndTime-"+i];

			// hardcoded spring 2019
			let semesterStart = new Date("2019-01-22");
			let semesterEnd = new Date("2019-05-08");

			for (let date = semesterStart; date <= semesterEnd; date.setDate(date.getDate() + 1)) {
				if (courseStartTime && courseEndTime) {
					start = new Date(date.getFullYear(), date.getMonth(), 
						date.getDate(), courseStartTime.split(":")[0], 
						courseStartTime.split(":")[1]);
					end = new Date(date.getFullYear(), date.getMonth(), 
						date.getDate(), courseEndTime.split(":")[0], 
						courseEndTime.split(":")[1]);
				}
				else {
					start = new Date(date.getFullYear(), date.getMonth()+1, 
						date.getDate());
					end = new Date(date.getFullYear(), date.getMonth()+1, 
						date.getDate());
				}
				dow = date.getDay();

				event = {
					title: courseNumber + ' - ' + courseName,
					start: start,
					end: end,
					category: 'student'
				}

				// Add event to calendar if the days match up
				if (dow == 1 && courseMonday) {
					calendar_events.push(event);
				}
				else if (dow == 2 && courseTuesday) {
					calendar_events.push(event);
				}
				else if (dow == 3 && courseWednesday) {
					calendar_events.push(event);
				}
				else if (dow == 4 && courseThursday) {
					calendar_events.push(event);
				}
				else if (dow == 5 && courseFriday) {
					calendar_events.push(event);
				}
			}
		}
		// step 3
		let percentStudent = req.body.balanceStudent;
		let percentLife = req.body.balanceLife;
		let percentSleep = req.body.balanceSleep;

		let user_json = {
			userName: userName,
			userEmail: userEmail,
			userPassword: userPassword,
			calendar: calendar_events,
			percentStudent: percentStudent,
			percentLife: percentLife,
			percentSleep: percentSleep
		}
		for (let i = 0; i < calendar_events.length; i++)
		{
			await eventData.create(calendar_events[i]);
		}
		res.redirect("/calendar");
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.post("/calendar", async (req, res) => {
	// TODO user "login" - determine which file to load
	// Need to avoid sending user password in url
	res.redirect('/calendar')
})

router.get("/calendar", async (req, res) => {
	try {
		// do stuff
		let options = {
			title: "Calendar!",
		};
		res.render("partials/pages/calendar", options);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.get("/calendar/events", async (req, res) => {
	try {
		let events = await eventData.readAll();
		res.json(events);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.post("/calendar/events", async (req, res) => {
	try {
		// console.log(req.query);
		// console.log(req.body);
		// console.log(req.params);
		let event = {
			title: req.body.title,
			description: req.body.description,
			start: req.body.start,
			end: req.body.end,
			location: req.body.location
		};
		eventData.create(event);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.get("/profile", (req, res) => {
	try {
		let stylesheets = `<link href="https://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">`;

		let options = {
			title: "Profile",
			stylesheets: stylesheets
		};

		res.render("partials/pages/profile", options);
	} catch (err) {
		res.status(400);
		res.send(error);
	}
})

module.exports = router;