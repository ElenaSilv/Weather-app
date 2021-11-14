function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "36627385a0b4fa9441ba14c41f6e63ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windELement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windELement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "36627385a0b4fa9441ba14c41f6e63ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function showCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#which-city");
  search(cityInputElement.value);
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let realTime = document.querySelector("#time");
realTime.innerHTML = `${currentHour}:${currentMinute}`;
let realDate = document.querySelector("#date");
realDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("submit", showCity);

search("London");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
      <div class="col-5" id="weatherunit">
       <img
       id="weatherimg"
       src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png"
       width="42"
       />
       <span class="weather-forecast-day"> ${formatDay(forecastDay.dt)} 
       </span>
       <span class="maxtemp"> ${Math.round(forecastDay.temp.max)}°
       </span>
       <span class="mintemp">/ ${Math.round(forecastDay.temp.min)}°
       </span>
      </div>
     </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
