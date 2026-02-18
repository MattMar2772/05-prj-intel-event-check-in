// Get all DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamInput = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;
// Hand form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = nameInput.value;
    const team = teamInput.value;
    const teamName = teamInput.selectedOptions[0].text;

    console.log(name, teamName);

    //Increment count
    count++;
    console.log("Total Check-Ins: ", count);

    //Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);

    //Update team counter
    const teamCount = document.getElementById(team + "Count");
    const current = parseInt(teamCount.textContent);
    teamCount.textContent = current + 1;
})