// Get all DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamInput = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const storedCount = localStorage.getItem("checkInCount");
if (storedCount === null) {
    count = 0;
    localStorage.setItem("checkInCount", count);
} else {
    const parsedCount = Number(storedCount);
    count = Number.isNaN(parsedCount) ? 0 : parsedCount;
    localStorage.setItem("checkInCount", count);
    console.log(count);
}

const maxCount = 50;

//Track team attendance
const teamTotals = new Map();

//Set initial team counts to 0 or retrieve from localStorage
if (localStorage.getItem("waterCount") === null) {
    teamTotals.set("Team Water Wise", 0);
    localStorage.setItem("waterCount", 0);
} 
else {
    teamTotals.set("Team Water Wise", parseInt(localStorage.getItem("waterCount"), 10));
}

if (localStorage.getItem("zeroCount") === null) {
    teamTotals.set("Team Net Zero", 0);
    localStorage.setItem("zeroCount", 0);
} 
else {
    teamTotals.set("Team Net Zero", parseInt(localStorage.getItem("zeroCount"), 10));
}

if (localStorage.getItem("powerCount") === null) {
    teamTotals.set("Team Renewables", 0);
    localStorage.setItem("powerCount", 0);
} 
else {
    teamTotals.set("Team Renewables", parseInt(localStorage.getItem("powerCount"), 10));
}
console.log("Initial Team Totals: ", teamTotals);

//Set initial attendee count in the DOM
document.getElementById("attendeeCount").textContent = count;

//Set initial progress percentage to 0 or retrieve from localStorage
if (localStorage.getItem("progressPercentage") === null) {
    localStorage.setItem("progressPercentage", "0%");
} 
else {
    const storedPercentage = localStorage.getItem("progressPercentage");
    document.getElementById("progressBar").style.width = storedPercentage;
    console.log("Initial Progress Percentage: ", storedPercentage);
}

//Set initial team counts in the DOM
document.getElementById("waterCount").textContent = teamTotals.get("Team Water Wise");
document.getElementById("zeroCount").textContent = teamTotals.get("Team Net Zero");
document.getElementById("powerCount").textContent = teamTotals.get("Team Renewables");

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
    localStorage.setItem("checkInCount", count);
    console.log("Total Check-Ins: ", count);
    if (count > maxCount) {
        alert("Maximum check-ins reached!");
        return;
    }
    else {
        document.getElementById("attendeeCount").innerHTML = count;
        localStorage.setItem("checkInCount", count);     
    }

    //Update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    localStorage.setItem("progressPercentage", percentage);
    console.log(`Progress: ${percentage}`);
    document.getElementById("progressBar").style.width = percentage;

    //Update team counter
    const teamCount = document.getElementById(team + "Count");
    const current = Number(teamCount.textContent) || 0;
    teamCount.textContent = localStorage.getItem(team + "Count") ? Number(localStorage.getItem(team + "Count")) + 1 : current + 1;
    teamTotals.set(teamName, teamTotals.get(teamName) + 1);
    localStorage.setItem("waterCount", teamTotals.get("Team Water Wise"));
    localStorage.setItem("zeroCount", teamTotals.get("Team Net Zero"));
    localStorage.setItem("powerCount", teamTotals.get("Team Renewables"));

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
    localStorage.setItem("winningTeam", winningTeam);
    console.log("Winning Team: ", winningTeam);

    //Celebration message
    if (count === maxCount) {
        alert(`The check-in goal has been complete! Congratulations to ${winningTeam} for having the most check-ins!`);
    }

    //Reset form
    form.reset();
});