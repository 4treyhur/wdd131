// ---------- Footer: dynamic year and last-modified date ----------
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ---------- Weather: static sample values (metric units) ----------
// A future course will replace these with live values from a weather API.
const temperature = 8;   // °C
const windSpeed = 10;    // km/h

// Returns the wind chill factor for the given Celsius temperature and km/h wind speed.
function calculateWindChill(tempC, speedKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16);
}

document.getElementById('temperature').textContent = `${temperature} °C`;
document.getElementById('wind').textContent = `${windSpeed} km/h`;

// Only a valid wind chill calculation (metric): temp <= 10 °C and wind speed > 4.8 km/h
const windChillDisplay = document.getElementById('windChill');
windChillDisplay.textContent = (temperature <= 10 && windSpeed > 4.8)
    ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`
    : 'N/A';