const router = require("express").Router();

router.get("", async (req, res) => {
	try {
		let options = {
			title: "Main Page"
		};
		res.render("templates/landing");
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
		let options = {
			title: "Login"
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
		<link href='/@fullcalendar/list/main.css' rel='stylesheet'/>`;
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

		let scripts = `<script src="/public/js/start_form.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
		`
		let options = {
			title: "Start Form",
			stylesheets: stylesheets,
			scripts: scripts,
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

module.exports = router;