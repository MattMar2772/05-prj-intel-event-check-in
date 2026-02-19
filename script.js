// Get all DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamInput = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 10;

//Track team attendance
const teamTotals = new Map();

//Set initial team counts to 0
teamTotals.set("Team Water Wise", 0);
teamTotals.set("Team Net Zero", 0);
teamTotals.set("Team Renewables", 0);

// Handle form submission
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
    if (count > maxCount) {
        alert("Maximum check-ins reached!");
        return;
    }
    else {
        document.getElementById("attendeeCount").innerHTML = count;
    }

    //Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);
    document.getElementById("progressBar").style.width = percentage;

    //Update team counter
    const teamCount = document.getElementById(team + "Count");
    const current = parseInt(teamCount.textContent);
    teamCount.textContent = current + 1;
    teamTotals.set(teamName, teamTotals.get(teamName) + 1);

    //Display welcome message
    const welcomeMessage = document.getElementById("greeting");
    welcomeMessage.style.display = "block";
    welcomeMessage.style.opacity = 0;
    welcomeMessage.style.transition = "opacity 0.5s ease-in";
    setTimeout(() => {
        welcomeMessage.style.opacity = 1;
    }, 100);
    welcomeMessage.innerHTML = `Welcome, ${name} from ${teamName}!`;
    welcomeMessage.style.transition = "opacity 3s ease-out";
    setTimeout(() => {
        welcomeMessage.style.opacity = 0;
    }, 3000);
    setTimeout(() => {
        welcomeMessage.style.display = "none";
    }, 6000);

    //Track winning team
    let winningTeam = "";
    function getKeyByValue(map, searchValue) {
        for (const [key, value] of map.entries()) {
            if (value === searchValue) {
                return key;
            }
        }
    }
    winningTeam = getKeyByValue(teamTotals, Math.max(...teamTotals.values()));
    console.log("Winning Team: ", winningTeam);

    //Celebration message
    if (count === maxCount) {
        alert(`The check-in goal has been complete! Congratulations to ${winningTeam} for having the most check-ins!`);
}

    //Reset form
    form.reset();
});