const xhttpRequest = new XMLHttpRequest()
xhttpRequest.onreadystatechange = function() {
    weatherTitle.textContent = `Weather in ${cityName}`
    try {
        const res = JSON.parse(this.responseText)
        displayCurrentWeather(res.current);
        displayForecast(res.forecast.forecastday);
    } catch (error) {}
}
const API_KEY = '0c4867d74c9a4e31b60195652240502'
const daysParam = 14
const cityInput = document.getElementById('cityInput')
const weatherTitle = document.getElementById('weather-title')
let cityName = ''

function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = forecast.map(day => `
        <div>
        <strong>Date:</strong> ${day.date}
        </div>
        <div>
        <strong>Max Temperature:</strong> ${day.day.maxtemp_c}°C (${day.day.maxtemp_f}°F)
        </div>
        <div>
        <strong>Min Temperature:</strong> ${day.day.mintemp_c}°C (${day.day.mintemp_f}°F)
        </div>
        <div>
        <strong>Condition:</strong> ${day.day.condition.text}
        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
        </div>
        <hr>
    `).join('');
}

function displayCurrentWeather(currentWeather) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    currentWeatherContainer.innerHTML = `
        <div>
        <strong>Temperature:</strong> ${currentWeather.temp_c}°C (${currentWeather.temp_f}°F)
        </div>
        <div>
        <strong>Condition:</strong> ${currentWeather.condition.text}
        <img src="${currentWeather.condition.icon}" alt="${currentWeather.condition.text}">
        </div>
        <div>
        <strong>Humidity:</strong> ${currentWeather.humidity}%
        </div>
        <div>
        <strong>Wind:</strong> ${currentWeather.wind_kph} km/h, ${currentWeather.wind_dir}
        </div>
    `;
}

function clearAll() {
    const currentWeatherContainer = document.getElementById('currentWeather');
    currentWeatherContainer.innerHTML = '';

    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''

    weatherTitle.textContent = `Weather`
    cityInput.value = ''
}

async function fetchWeather() {
    try {
        cityName = cityInput.value.trim()

        if (!cityName) {
            return alert('Please enter a city!!')
        }
        
        xhttpRequest.open(
            'GET',
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=${daysParam}`,
            true
        )
        xhttpRequest.send();
    } catch (error) {
        alert(error.message || error)
    }
}
