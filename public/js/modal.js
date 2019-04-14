// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("submit", function () {
	// get event info
	let title = document.getElementById('title').value;
	let description = document.getElementById('description').value;
	let date = document.getElementById('date').value;
	let from = document.getElementById('from').value;
	let to = document.getElementById('to').value;
	let location = document.getElementById('location').value;
	addEvent(title, description, date, from, to, location);
	modal.style.display = "none";
});