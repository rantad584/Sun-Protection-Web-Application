// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var canvas,
    ctx,
    cX,
    cY,
    radius,
    totalArc = 3.14;
function MaxUviDay(a, e) {
    canvas = document.getElementById(e);
    canvas.style.webkitFilter = "blur(0.5px)";
    ctx = canvas.getContext("2d");
    cX = Math.floor(canvas.width / 2);
    cY = Math.floor(canvas.height);
    radius = 0.99 * Math.min(cX, cY);
    totalArc = 3.14;
    ctx.createLinearGradient(0, 0, canvas.width, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    DibujarAirQuality(a);

    const uvLevelElements = document.querySelectorAll(".uvLevel");
    uvLevelElements.forEach(uvLevelElement => {
        let uvLevelText = "";
        if (a <= 2) {
            uvLevelText = "Low";
        } else if (a <= 4) {
            uvLevelText = "Moderate";
        } else if (a <= 6) {
            uvLevelText = "High";
        } else if (a <= 8) {
            uvLevelText = "Very High";
        } else {
            uvLevelText = "Extreme";
        }
        uvLevelElement.textContent = uvLevelText; // Update the UV level text based on UV index
    });
    const uvInfoElement = document.querySelector(".uvi-info");
    if (uvInfoElement) {
        let uvLevelText = `<span>Suggestion:</span>`;
        if (a === "") {
            uvLevelText = "";
        } else if (a <= 2) {
            uvLevelText +=
                `<p>U 1-2: under UV 3 experts agree that little sun protection is needed if exposure is less than 1 hour.</p><a class="btn btn-outline-dark" href="/Home/HowToProtect#SunscreenUsageStart">Sun Protection Solutions »</a>`;
        } else if (a <= 4) {
            uvLevelText +=
                `<p>UV 3-4: This is a mild UV level which necessitates sun protection if you are outside for more than 30 minutes.</p><a class="btn btn-outline-dark" href="/Home/HowToProtect#SunscreenUsageStart">Sun Protection Solutions »</a>`;
        } else if (a <= 6) {
            uvLevelText +=
                `<p>UV 5-6: High UV index that necessitates careful planning to avoid skin damage if outside. Fair skinned people will burn 20 minutes of unprotected exposure.</p><a class="btn btn-outline-dark" href="/Home/HowToProtect#SunscreenUsageStart">Sun Protection Solutions »</a>`;
        } else if (a <= 8) {
            uvLevelText +=
                `<p>UV 7-8: Very High UV levels. Take diligent care in the sun as adults will burn in 15 minutes. Children younger than 4 will burn quicker!</p><a class="btn btn-outline-dark" href="/Home/HowToProtect#SunscreenUsageStart">Sun Protection Solutions »</a>`;
        } else {
            uvLevelText +=
                `<p>UV 9-11+ Extreme UV levels. Strongly consider staying indoors between 10 am - 4 pm. If outside take care not to expose skin for long periods of time.</p><a class="btn btn-outline-dark" href="/Home/HowToProtect#SunscreenUsageStart">Sun Protection Solutions »</a>`;
        }
        uvInfoElement.innerHTML = uvLevelText; // Update the UV level text based on maximum UV index
    }
}
function drawWedge2(a, e) {
    var g = ((a / 100) * 180 * Math.PI) / 180;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.arc(cX, cY, radius, totalArc, totalArc + g, !1);
    ctx.closePath();
    ctx.fillStyle = e;
    ctx.fill();
    ctx.restore();
    totalArc += g;
}
function DibujarAirQuality(a) {
    for (
        var e = [19.8, 0.2, 19.8, 0.2, 19.8, 0.2, 19.8, 0.2, 20],
        g =
            "#289500 transparent #F7E400 transparent #F85900 transparent #D8001D transparent #6B49C8".split(
                " "
            ),
        f = 0;
        f < e.length;
        f++
    )
        drawWedge2(e[f], g[f]);
    var k = 0;
    3 > a
        ? (k = 0)
        : 6 > a
            ? (k = 2)
            : 8 > a
                ? (k = 4)
                : 11 > a
                    ? (k = 6)
                    : 11 <= a && (k = 8);
    g = g[k];
    var l = 0;
    for (f = 0; f < e.length; f++) f < k && (l += e[f]);
    l *= 0.3;
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.fillStyle = "#ffffff";
    ctx.arc(cX, cY, 0.6 * radius, 0, 2 * Math.PI, !1);
    ctx.fill();
    FormaAguja(l + (e[k] / 2) * 0.3, g);
    radius = 0.525 * Math.min(cX, cY);
    totalArc = 3.14;
    drawWedge2(100, g);
    radius = 0.45 * Math.min(cX, cY);
    totalArc = 3.14;
    drawWedge2(110, "#ffffff");
    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(a, canvas.width / 2, canvas.height - 5);
}
function FormaAguja(a, e) {
    c = a;
    b = 0.01745329252 * (6 * c - 180);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = e;
    ctx.moveTo(cY, cY);
    ctx.lineTo(cY + 115 * Math.cos(b), cY + 115 * Math.sin(b));
    ctx.stroke();
    for (i = 1; 40 >= i; i++)
        (c = a + 0.04 * i),
            (d = a - 0.04 * i),
            (h = 115 - 0.5 * i),
            (b = 0.01745329252 * (6 * c - 180)),
            (n = 0.01745329252 * (6 * d - 180)),
            ctx.beginPath(),
            (ctx.lineWidth = 1),
            (ctx.strokeStyle = e),
            ctx.moveTo(cY, cY),
            ctx.lineTo(cY + h * Math.cos(b), cY + h * Math.sin(b)),
            ctx.stroke(),
            ctx.beginPath(),
            (ctx.lineWidth = 1),
            (ctx.strokeStyle = e),
            ctx.moveTo(cY, cY),
            ctx.lineTo(cY + h * Math.cos(n), cY + h * Math.sin(n)),
            ctx.stroke();
}

function updateUVIndexes(uvData) {
    let maxUVIndex = 0; // Initialize the maximum UV index

    uvData.forEach((data) => {
        const { hour, uvIndex } = data;
        const uvClass = `p${uvIndex}`; // Maps the UV index to the corresponding class

        // Update maximum UV index if current one is higher
        if (uvIndex > maxUVIndex) {
            maxUVIndex = uvIndex;
        }

        document.querySelectorAll(".UvIndex .horhor").forEach((container) => {
            const hora = container.querySelector(".hora");
            if (hora && hora.textContent.trim() === hour) {
                const barElement = container.querySelector(".bar");
                const indexElement = container.querySelector(".ener");
                barElement.innerHTML = `<span class="rad ${uvClass}"></span>`; // Update the UV index bar
                indexElement.innerHTML = `<strong>${uvIndex}</strong>`; // Update the UV index number
            }
        });
    });

    MaxUviDay(maxUVIndex, "canvas1");
}

// initially uvindex are all 0 and set the date to current date
const initialUvData = [
    { hour: "09:00", uvIndex: 0 },
    { hour: "10:00", uvIndex: 0 },
    { hour: "11:00", uvIndex: 0 },
    { hour: "12:00", uvIndex: 0 },
    { hour: "13:00", uvIndex: 0 },
    { hour: "14:00", uvIndex: 0 },
    { hour: "15:00", uvIndex: 0 },
    { hour: "16:00", uvIndex: 0 },
    { hour: "17:00", uvIndex: 0 },
    { hour: "18:00", uvIndex: 0 },
];

updateUVIndexes(initialUvData);
MaxUviDay("", "canvas1");

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long", // Example "Monday"
    year: "numeric", // Example "2023"
    month: "long", // Example "July"
    day: "numeric", // Example "20"
});

const dateElement = document.querySelector(".UvIndex .HeadDia h3");
if (dateElement) {
    dateElement.textContent = `Today ${formattedDate}`;
}

async function getUnixTimestampForCityOfHour(lat, lng, hour) {
    try {
        // Fetch timezone offset for the city
        const timestamp = Math.floor(Date.now() / 1000);
        const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${timestamp}&key=AIzaSyC3hKH8Rr-IhESluHILnu48f2jw0t22-h0`;

        const timezoneResponse = await fetch(timezoneUrl);
        const timezoneData = await timezoneResponse.json();
        const { dstOffset, rawOffset } = timezoneData; // in seconds
        const totalOffset = dstOffset + rawOffset; // Total offset from UTC in seconds

        // Calculate the Unix UTC timestamp for today's 9:00 AM local time
        const today = new Date();
        today.setHours(hour, 0, 0, 0);
        const localTimestamp = Math.floor(today.getTime() / 1000); // Convert to Unix timestamp
        return localTimestamp;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function fetchUVIndexAtSpecifiedTime(lat, lon, timestamp) {
    const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=a5a8c86e888f08ceb1d9270f8a59a7a6`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data[0].uvi; // Assuming you want the current UV index at the requested time
    } catch (error) {
        console.error("Error fetching historical UV index:", error);
        return null;
    }
}

async function getUVIndexForToday(lat, lon) {
    // Determine the timezone offset for the location
    const timezoneUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,hourly,alerts&appid=a5a8c86e888f08ceb1d9270f8a59a7a6`;
    const timezoneResponse = await fetch(timezoneUrl);
    const timezoneData = await timezoneResponse.json();
    const timezoneOffset = timezoneData.timezone_offset; // Timezone offset in seconds from UTC
    const today = new Date();
    const uvIndexDictionary = {}; // Initialize empty object to store UV indices by hour

    // List of hours for which you want UV data
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    // Compute the date objects for each hour in local time using the timezone offset
    for (let hour of hours) {
        const localUnixTime = await getUnixTimestampForCityOfHour(
            lat,
            lon,
            hour
        );

        // Construct the API URL for the historical data
        const histUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${localUnixTime}&appid=a5a8c86e888f08ceb1d9270f8a59a7a6`;

        try {
            const histResponse = await fetch(histUrl);
            const histData = await histResponse.json();
            if (histData.data && histData.data[0].uvi !== undefined) {
                // Format hour as "HH:00" and store the UV index
                uvIndexDictionary[`${hour < 10 ? "0" + hour : hour}:00`] =
                    histData.data[0].uvi;
            }
        } catch (error) {
            console.error(`Error fetching UV index for ${hour}:00:`, error);
        }
    }

    return uvIndexDictionary;
}

// this function is for querying the uv index based on the input surburb
async function getUVIndex() {
    document.getElementById("loader-overlay").style.display = "flex"; // Show the overlay
    document.getElementById("address").disabled = true; // Disable the address input
    document.getElementById("getUVIndexButton").disabled = true; // Disable the button to prevent further clicks

    const address = document.getElementById("address").value;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
    )}&key=AIzaSyC3hKH8Rr-IhESluHILnu48f2jw0t22-h0`;

    try {
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        if (!geocodeData.results.length) {
            document.getElementById("loader-overlay").style.display = "none"; // Hide the overlay
            document.getElementById("address").disabled = false; // Re-enable the address input
            document.getElementById("getUVIndexButton").disabled = false; // Re-enable the button
            alert("City does not exist, please input city name in Victoria.");
            return; // Stop execution if no city found
        }
        const { lat, lng } = geocodeData.results[0].geometry.location;

        const uvIndexUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily,hourly,alerts&appid=a5a8c86e888f08ceb1d9270f8a59a7a6`;
        const uvResponse = await fetch(uvIndexUrl);
        const uvData = await uvResponse.json();

        const timezoneOffset = uvData.timezone_offset; // Timezone offset in seconds from UTC

        // Convert sunrise and sunset timestamps to local time considering timezone offset
        const sunriseDate = new Date(
            (uvData.current.sunrise + timezoneOffset) * 1000
        );
        const sunsetDate = new Date(
            (uvData.current.sunset + timezoneOffset) * 1000
        );

        // Format sunrise and sunset times as HH:mm
        const sunriseTime = sunriseDate.toISOString().substr(11, 5);
        const sunsetTime = sunsetDate.toISOString().substr(11, 5);

        document.getElementById("sunrise").textContent = `${sunriseTime}`;
        document.getElementById("sunset").textContent = `${sunsetTime}`;

        const hourlyUVData = await getUVIndexForToday(lat, lng);
        const formattedUVData = Object.entries(hourlyUVData).map(
            ([hour, uvIndex]) => {
                return { hour: hour, uvIndex: Math.round(uvIndex) }; // Constructing array from object
            }
        );

        // Update the HTML elements with new UV index data
        updateUVIndexes(formattedUVData);

        // Update the location displayed in the HTML
        document.querySelectorAll(".location").forEach((locationElement) => {
            locationElement.textContent = address; // Set the location to the user input
        });
    } catch (error) {
        alert("Error retrieving data:" + error);
    }

    document.getElementById("loader-overlay").style.display = "none"; // Hide the overlay
    document.getElementById("address").disabled = false; // Re-enable the address input
    document.getElementById("getUVIndexButton").disabled = false; // Re-enable the button
}

// hide UV index pop-up notice after clicking button
document.querySelectorAll('.button-link').forEach(function (button) {
    button.addEventListener('click', function (e) {
        document.querySelectorAll('.notice-overlay').forEach(function (overlay) {
            overlay.style.display = 'none';
        });
    });
});
