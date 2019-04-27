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

router.post("/calendar", async (req, res) => {
	// TODO user "login" - determine which file to load
	// Need to avoid sending user password in url
	res.redirect('/calendar')
})

router.get("/calendar", async (req, res) => {
	try {
		// do stuff
		let scripts2 = `<script src='/public/js/modal.js'></script>`;
		let options = {
			scripts2: scripts2,
			title: "Calendar!",
		};
		res.render("partials/pages/calendar", options);
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

router.post("/startform", async (req, res) =>{
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
					start = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
						date.getDate() + 'T' + courseStartTime;
					end = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
						date.getDate() + 'T' + courseEndTime;
				}
				else {
					start = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
						date.getDate();
					end = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
						date.getDate();
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
		console.log(user_json);
		// TODO USER JSON SHOULD GO TO DATABASE
		res.redirect("/calendar");		
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.get("/profile", (req, res) => {
	try {
		let stylesheets = `<link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">`;

		let scripts1 = `<script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
			<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
			<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
			<script type="text/javascript">
				// Load google charts
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChart);

				// Draw the chart and set the chart values
				function drawChart() {
				var data = google.visualization.arrayToDataTable([
				['Task', 'Hours per Day'],
				['Work', 8],
				['Friends', 2],
				['Eat', 2],
				['TV', 2],
				['Gym', 2],
				['Sleep', 8]
				]);

				// Optional; add a title and set the width and height of the chart
				var options = {'title':'My Average Day', 'width':550, 'height':400};

				// Display the chart inside the <div> element with id="piechart"
				var chart = new google.visualization.PieChart(document.getElementById('chartOne'));
				chart.draw(data, options);
				}
			</script>

			<script type="text/javascript">
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawChart);

				function drawChart() {
					var data = google.visualization.arrayToDataTable([
					['Category', 'Target Percentage', 'Achieved Percentage'],
					['Sleep', 40, 35],
					['Work', 30, 40],
					['Play', 30, 25]
					]);

					var options = {
					chart: {
						title: 'Goals vs Achieved'
					}
					};

					var chart = new google.charts.Bar(document.getElementById('chartTwo'));

					chart.draw(data, google.charts.Bar.convertOptions(options));
				}
			</script>
			`;
		let options = {
			title: "Profile",
			stylesheets: stylesheets,
			scripts1: scripts1,
		};

		res.render("templates/profile", options);
	} catch (err) {
		res.status(400);
		res.send(error);
	}
})

module.exports = router;