/* === GENERAL UTILITY === */

/**
 * Execute a CORS-anywhere GET request
 * @param {string} url
 */
function doCORSGet(url) {
    url = url || "";
    const corsApiUrl = 'https://cors-anywhere.herokuapp.com/';
    var req = new XMLHttpRequest();
    req.open('GET', corsApiUrl + url);

    req.onload = function() {
        const outputStr = `[${req.status} ${req.statusText}] ${req.responseText || ''}`;
        console.log(outputStr);
    };
    req.onerror = function() {
        const errorStr = `[ERROR] Code ${req.status} - ${req.statusText} \n\n ${req.responseText || ''}`;
        console.log(errorStr);
    };

    req.send();
}

/**
 * Gives a human-readable date string, given a date object
 * @param {Date} time
 * @returns {string}
 */
function generateTimeString(time) {
    const monthNames = ['January', 'February', 'March',
        'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ];

    const thisMonth = time.getMonth();
    const dayOfMonth = time.getDate();
    const dayName = time.getDay();

    const dateString = `${dayNames[dayName]}, ${monthNames[thisMonth]} ${dayOfMonth}`;

    return dateString;
}

/**
 * Writes today's date to the corresponding <h3> tag
 */
function writeTodaysDate() {
    let dateElement = document.getElementById("date");
    const today = generateTimeString(new Date());

    dateElement.innerHTML = today;
}

/**
 * Writes the current time to a corresponding time tag
 */
function writeCurrentTime() {
    let timeElement = document.getElementById("time");
    const rightNow = new Date();

    // This is a really terrible way to get the time
    const clock = rightNow.toString().split(" ")[4];
    timeElement.innerHTML = clock;
}

/* === CALLBACK FUNCTIONS === */

/**
 * 'darkmode' button is pressed
 */
function onDarkPressed() {
    let darkButton = document.getElementById("darkmode");
    let bodyTag = document.getElementsByTagName("body")[0];
    darkButton.classList.toggle("active");
    bodyTag.classList.toggle("dark");
}

/**
 * Search bar onKeyUp event detected
 */
function sendQuery(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;

    // User pressed return key
    if (keyCode == '13') {
        let queryString = "https://duckduckgo.com/?q=";
        let args = (this.value).split(" ").join("+");
        window.open(`${queryString}${args}`);
        return false;
    }
}

/* === MAIN EXECUTION === */

// Set event listener for search
document.getElementById("searchbar").onkeypress = sendQuery;
writeCurrentTime();
writeTodaysDate();
setInterval(writeCurrentTime, 1000);