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

function convertFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusConversion.classList.remove("active");
  farenheitConversion.classList.add("active");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  farenheitConversion.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
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

let celsiusTemperature = null;

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("submit", showCity);

let farenheitConversion = document.querySelector("#fahrenheit");
farenheitConversion.addEventListener("click", convertFarenheit);

let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", displayCelciusTemp);

search("New York");
