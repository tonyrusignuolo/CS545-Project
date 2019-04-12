let events = [
	{
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

let events2 = [];

document.addEventListener('DOMContentLoaded', function () {
	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		dateClick: function() {
			alert('a day has been clicked!');
		},
		header: { center: 'dayGridMonth,timeGridWeek' },
		plugins: ['dayGrid', 'timeGrid', 'list'], 
		events: events
	});
	calendar.render();
});

function whatever(){
	// create new json object
}

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