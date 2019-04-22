const router = require("express").Router();

router.get("", async (req, res) => {
	try {
		let stylesheets = `<link href="/public/css/landing.css" rel="stylesheet">`;
		let options = {
			title: "Main Page",
			stylesheets: stylesheets
		};
		res.render("templates/landing", options);
	} catch (err) {
		res.status();
		res.render("templates/error", {
			title: "Error",
			err: err
		});
	}
})

router.get("/login", async (req, res) => {
	try {
		let stylesheets = `<link href="/public/css/login.css" rel="stylesheet">`;
		let options = {
			title: "Login",
			stylesheets: stylesheets
		};
		res.render("templates/login", options);
	} catch (err) {
		res.status();
		res.render("templates/error", {
			title: "Error",
			err: err
		});
	}
})

router.get("/calendar", async (req, res) => {
	try {
		// do stuff
		let stylesheets = `<link href='/public/css/main.css' rel='stylesheet'/>
		<link href='/@fullcalendar/core/main.css' rel='stylesheet'/>
		<link href='/@fullcalendar/daygrid/main.css' rel='stylesheet'/>
		<link href='/@fullcalendar/timegrid/main.css' rel='stylesheet'/>
		<link href='/@fullcalendar/list/main.css' rel='stylesheet'/>
		<link href="/public/css/calendar.css" rel="stylesheet">`;
		let scripts1 = `<script data-require="jquery@*" data-semver="3.1.1" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src='/@fullcalendar/core/main.js'></script>
		<script src='/@fullcalendar/daygrid/main.js'></script>
		<script src='/@fullcalendar/timegrid/main.js'></script>
		<script src='/@fullcalendar/list/main.js'></script>
		<script src='/@fullcalendar/interaction/main.js'></script>
		<script src='/public/js/calendar.js'></script>`;
		let scripts2 = `<script src='/public/js/modal.js'></script>`;
		let options = {
			stylesheets: stylesheets,
			scripts1: scripts1,
			scripts2: scripts2,
			title: "Calendar!",
		};
		res.render("templates/calendar", options);
	} catch (err) {
		res.status();
		res.render("templates/error", {
			title: "Error",
			err: err
		});
	}
})

router.get("/startForm", async (req, res) => {
	try {
		let stylesheets = `<link href="/public/css/start_form.css" rel="stylesheet">`;

		let scripts1 = `<script src="/public/js/start_form.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
		`
		let options = {
			title: "Start Form",
			stylesheets: stylesheets,
			scripts1: scripts1,
		};
		res.render("templates/startForm", options);
	} catch (err) {
		res.status();
		res.render("templates/error", {
			title: "Error",
			err: err
		});
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
		res.status();
		res.render("templates/error", {
			title: "Error",
			err: err
		});
	}
})

module.exports = router;