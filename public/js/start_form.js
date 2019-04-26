var currentTab = 0; // Current tab is set to be the first tab (0)
var num_courses = 0; // TODO this should be value from handlebars
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

/**
 * Updates the pie-chart dynamically based on form values.
 * @param {string} type 
 */
function updatePieChart(type)
{
    let percentStudent = document.getElementById("balanceStudent").value;
    let percentLife = document.getElementById("balanceLife").value;
    let percentSleep = document.getElementById("balanceSleep").value;

    let hoursStudent = document.getElementById("balanceStudentHours").value;
    let hoursLife = document.getElementById("balanceLifeHours").value;
    let hoursSleep = document.getElementById("balanceSleepHours").value;
    if (type == 'percent') {
        // Update hours
        document.getElementById("balanceStudentHours").value = percentStudent * 24 / 100;
        document.getElementById("balanceLifeHours").value = percentLife * 24 / 100;
        document.getElementById("balanceSleepHours").value = percentSleep * 24 / 100;

        myPieChart.destroy();
        loadPieChart();
    }
    else if (type == 'hours') {
        // Update percents
        document.getElementById("balanceStudent").value = hoursStudent * 100 / 24;
        document.getElementById("balanceLife").value = hoursLife * 100 / 24;
        document.getElementById("balanceSleep").value = hoursSleep * 100 / 24;

        myPieChart.destroy();
        loadPieChart();
    }
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

    // Update all ids and clear inputs
    newCourse.childNodes.forEach(child => {
        if (child.nodeName == "DIV") {
            if (child.classList.contains('form-days')) {
                // Take care of checkboxes
                child.childNodes.forEach(checkbox_child => {
                    if (checkbox_child.nodeName == "DIV") {
                        id = checkbox_child.children[0].id;
                        id = id.split('-')[0] + '-' + num_courses;
                        checkbox_child.children[0].id = id;
                        checkbox_child.children[0].checked = false;
                    }
                })

            }
            else {
                // Take care of input fields
                id = child.children[1].children[0].id;
                id = id.split('-')[0] + '-' + num_courses;
                child.children[1].children[0].id = id;
                child.children[1].children[0].value = '';
            }
        }
    })

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
        let userName = document.getElementById("userName");
        let userEmail = document.getElementById("userEmail");
        let userPassword = document.getElementById("userPassword");

        if (userName.value == "") {
            userName.setCustomValidity("User Name required.");
            valid = false;
        }
        else {
            userName.setCustomValidity("");
        }
        // TODO additional validation
        if (userEmail.value == "") {
            userEmail.setCustomValidity("User Email required.");
            valid = false;
        }
        else {
            userEmail.setCustomValidity("");
        }
        // TODO additional validation
        if (userPassword.value == "") {
            userPassword.setCustomValidity("User Password required.");
            valid = false;
        }
        else {
            userPassword.setCustomValidity("");
        }
    }
    else if (currentTab == 1) {
        // No required fields
    }
    else if (currentTab == 2) {
        let percentStudent = document.getElementById("balanceStudent");
        let percentLife = document.getElementById("balanceLife");
        let percentSleep = document.getElementById("balanceSleep");

        console.log(isNaN(percentStudent.value) )

        if (isNaN(percentStudent.value) || percentStudent.value == '0') {
            percentStudent.setCustomValidity("Percentage required as integer.");
            valid = false;
        }
        if (isNaN(percentLife.value) || percentLife.value == '0') {
            percentLife.setCustomValidity("Percentage required as integer.");
            valid = false;
        }
        if (isNaN(percentSleep.value) || percentSleep.value == '0') {
            percentSleep.setCustomValidity("Percentage required as integer.");
            valid = false;
        }

    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className = "step finish";
    }
    else {
        document.getElementsByClassName("step")[currentTab].className = "step invalid";
    }
    return valid; // return the valid status
}

/**
 * Submits the form
 */
function submitStartForm(a) {
    // step 1
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    // console.log("userName", userName, "userEmail", userEmail, "userPassword", userPassword);

    // step 2
    calendar_events = [];
    for (let i = 0; i <= num_courses; ++i) {
        // TODO check if the initial course is filled out
        let courseNumber = document.getElementById("courseNumber-"+i).value;
        let courseName = document.getElementById("courseName-"+i).value;

        let courseMonday = document.getElementById("courseMonday-"+i).checked;
        let courseTuesday = document.getElementById("courseTuesday-"+i).checked;
        let courseWednesday = document.getElementById("courseWednesday-"+i).checked;
        let courseThursday = document.getElementById("courseThursday-"+i).checked;
        let courseFriday = document.getElementById("courseFriday-"+i).checked;

        let courseStartTime = document.getElementById("courseStartTime-"+i).value;
        let courseEndTime = document.getElementById("courseEndTime-"+i).value;
        
        // hardcoded spring 2019
        let semesterStart = new Date("2019-01-22");
        let semesterEnd = new Date("2019-05-08");

        for (let date = semesterStart; date <= semesterEnd; date.setDate(date.getDate() + 1)) {
            // TODO handle course Start and End empty
            start = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
                    date.getDate() + 'T' + courseStartTime;
            end = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
                    date.getDate() + 'T' + courseEndTime;
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
        // console.log("courseNumber", courseNumber, "courseName", courseName, 
        //     "courseMonday", courseMonday, "courseTuesday", courseTuesday,
        //     "courseWednesday", courseWednesday, "courseThursday", courseThursday,
        //     "courseFriday", courseFriday, "courseStartTime", courseStartTime,
        //     "courseEndTime", courseEndTime);
    }
    // step 3
    let percentStudent = document.getElementById("balanceStudent").value;
    let percentLife = document.getElementById("balanceLife").value;
    let percentSleep = document.getElementById("balanceSleep").value;
    // console.log("percentStudent", percentStudent, "percentLife", percentLife, "percentSleep", percentSleep);

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
    // TODO WRITE VALUES TO JSON
    window.location = "/calendar";
    return false;
}

function parseICS() {
    file = document.getElementById("courseFile").value;
    if (file) {
        // TODO need file reader

        fileShortName =  file.split('\\');
        fileShortName = fileShortName[fileShortName.length-1];
        document.getElementById("courseFileSuccess").innerHTML = "Successfully uploaded " + fileShortName; 
    }
}