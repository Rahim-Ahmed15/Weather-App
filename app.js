const apiKey = '5cef2cbeeb765da49aeee83a4e66da6d';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error-message").style.display = "block";
        document.querySelector(".weather-display").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city-name").innerHTML =
            `<i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}`;
        document.querySelector(".temperature").innerHTML =
            `${Math.round(data.main.temp)}°<span>C</span>`;
        document.querySelector(".humidity .detail-value").innerHTML =
            `${data.main.humidity}%`;
        document.querySelector(".wind .detail-value").innerHTML =
            `${data.wind.speed} km/h`;

        const weather = data.weather[0].main;
        if (weather === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weather === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weather === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weather === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weather === "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".weather-display").style.display = "block";
        document.querySelector(".error-message").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
