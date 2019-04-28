// import Calendar from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
var calendarEl;
var calendar;

function renderCalendar() {
	calendar = new FullCalendar.Calendar(calendarEl, {
		customButtons: {
			addEvent: {
				text: 'Add',
				click: function () {
					// addEvent();
					var modal = document.getElementById('myModal');
					modal.style.display = "block";
				}
			},
			profile: {
				text: 'Profile',
				click: function() {
					window.location.href = './profile';
				}
			}
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'profile addEvent dayGridMonth,timeGridWeek,listDay'
		},
		plugins: ['dayGrid', 'timeGrid', 'list'],
		// plugins: [FullCalendar.dayGridPlugin, FullCalendar.timeGrid, FullCalendar.list],
		views: {
			listDay: {
				buttonText: 'list day'
			},
			listWeek: {
				buttonText: 'list week'
			}
		},
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: events
	});
	calendar.render();
};

document.addEventListener('DOMContentLoaded', () => {
	calendarEl = document.getElementById('calendar');
	// calendar = new FullCalendar.Calendar(calendarEl, {});
	renderCalendar();
})

function addEvent(title, description, date, from, to, location) {
	let start = date + 'T' + from;
	let end = date + 'T' + to;
	let event = {
		title: title ? title : 'Title',
		description: description ? description : 'Description',
		start: start ? start : '2019-04-04',
		end: end ? end : '2019-04-05',
		location: location ? location : "Location"
	}
	events.push(event);
	calendar.destroy();
	renderCalendar();
	console.log("h");
}

let events = [{
		title: 'All Day Event',
		description: 'description for All Day Event',
		start: '2019-04-01'
	},
	{
		title: 'Long Event',
		description: 'description for Long Event',
		start: '2019-10-07',
		end: '2019-04-10'
	},
	{
		id: 999,
		title: 'Repeating Event',
		description: 'description for Repeating Event',
		start: '2019-04-09T16:00:00'
	},
	{
		id: 999,
		title: 'Repeating Event',
		description: 'description for Repeating Event',
		start: '2019-04-16T16:00:00'
	},
	{
		title: 'Conference',
		description: 'description for Conference',
		start: '2019-04-11',
		end: '2019-04-13'
	},
	{
		title: 'Meeting',
		description: 'description for Meeting',
		start: '2019-04-12T10:30:00',
		end: '2019-04-12T12:30:00'
	},
	{
		title: 'Lunch',
		description: 'description for Lunch',
		start: '2019-04-12T12:00:00'
	},
	{
		title: 'Meeting',
		description: 'description for Meeting',
		start: '2019-04-12T14:30:00'
	},
	{
		title: 'Birthday Party',
		description: 'description for Birthday Party',
		start: '2019-04-13T07:00:00'
	},
	{
		title: 'Click for Google',
		description: 'description for Click for Google',
		url: 'http://google.com/',
		start: '2019-04-28'
	}
]

// document.addEventListener('DOMContentLoaded', function () {
// 	var calendarEl = document.getElementById('calendar');
// 	var calendar = new Calendar(calendarEl, {
// 		plugins: [dayGridPlugin],
// 		events: events
// 	});
// 	calendar.render();
// });



// $('#calendar').fullCalendar({
// 	defaultView: 'month',
// 	defaultDate: '2018-04-12',

// 	eventRender: function (eventObj, $el) {
// 		$el.popover({
// 			title: eventObj.title,
// 			content: eventObj.description,
// 			trigger: 'hover',
// 			placement: 'top',
// 			container: 'body'
// 		});
// 	},
// });