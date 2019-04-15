var currentTab = 0; // Current tab is set to be the first tab (0)
var num_courses = 0;
var myPieChart;

window.addEventListener("load", function (event) {
    showTab(currentTab);
    loadPieChart();
});

/**
 * Loads the pie chart on the Student/Life Balance Goals slide.
 * @param {int} percentStudent 
 * @param {int} percentLife 
 * @param {int} percentSleep 
 */
function loadPieChart() {
    let percentStudent = document.getElementById("balanceStudent").value;
    let percentLife = document.getElementById("balanceLife").value;
    let percentSleep = document.getElementById("balanceSleep").value;

    var ctxP = document.getElementById("pieChart").getContext('2d');
    myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: ["Student", "Life", "Sleep"],
            datasets: [{
                data: [percentStudent, percentLife, percentSleep],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
            }]
        },
        options: {
            responsive: true
        }
    });
}

function updatePieChart()
{
    myPieChart.destroy();
    loadPieChart();
}

/**
 * Creates additional form fields to allow user to add more courses
 * on Input Class Schedule slide.
 */
function addCourseForm() {
    var prevCourse = document.getElementById('course-form-' + num_courses);
    var newCourse = prevCourse.cloneNode(true);
    newCourse.id = 'course-form-' + ++num_courses;
    prevCourse.parentNode.appendChild(newCourse);

    if (num_courses == 1) {
        document.getElementsByClassName("remove-course-form-button")[0].style.display = "inline";
    }
}

/**
 * Removes additional class form fields on Input Class Schedule slide.
 */
function removeCourseForm() {
    if (num_courses > 0) {
        var prevCourse = document.getElementById('course-form-' + num_courses);

        prevCourse.remove();
        --num_courses;

        if (num_courses == 0) {
            document.getElementsByClassName("remove-course-form-button")[0].style.display = "none";
        }
    }
}

/**
 * Determines which slide of the form should be visible, and manages the
 * Previous/Next/Submit buttons.
 * @param {int} n 
 */
function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

/**
 * Controls the Previous/NextSubmit buttons on each slide.
 * @param {int} n 
 */
function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("start-form").submit();
        // console.log("SUBMIT BUTTON PRESSED");
        submitStartForm();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

// form action = "/calendar";


/**
 * Modifies the dots at the bottom used to indicate which slide is
 * active. 
 * @param {int} n 
 */
function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

/**
 * Validates each slide of the form
 */
function validateForm() {
    var valid = true;

    // User Information 
    if (currentTab == 0) {
        //userName Email password
        let userName = document.getElementById("userName");
        if (userName.value == "") {
            // userName.className += " invalid"; // How to actually do this
            userName.setCustomValidity("User Name required.");
            valid = false;
        }
        else {
            userName.setCustomValidity("");
        }
        let userEmail = document.getElementById("userEmail");
        if (userEmail.value == "") {
            userEmail.setCustomValidity("User Email required.");
            valid = false;
        }
        else {
            userEmail.setCustomValidity("");
        }
        let userPassword = document.getElementById("userPassword");
        if (userPassword.value == "") {
            userPassword.setCustomValidity("User Password required.");
            valid = false;
        }
        else {
            userPassword.setCustomValidity("");
        }
    }
    // TODO slide 2 and 3

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

/**
 * Submits the form
 */
function submitStartForm(a) {
    // TODO
    // console.log("In submitStartForm");
    window.location = "/calendar";
    return false;
}