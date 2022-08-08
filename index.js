let now = new Date();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let monthes = [
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
let month = monthes[now.getMonth()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${date} ${month}, ${hours}:${minutes}`;

let apiKey = "840732df46586671238d6bee78ac6a4c";
let heading = document.getElementById("my-city");

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function formateDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  return day;
}

function showForecast(response) {
  let forecastData = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  console.log(response.data.daily);
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col everyday">
              <h3>
               <div class="forecast-day">${formateDate(forecastDay.dt)}
                <br />
                <small>${formateDay(forecastDay.dt)}</small>
                <br /> </div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="70"></img>
              </h3>
              <strong>${Math.round(forecastDay.temp.max)}°</strong>
              <br />
              ${Math.round(forecastDay.temp.min)}°
              <p>${Math.round(forecastDay.wind_speed)} m/s</p>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastData.innerHTML = forecastHTML;
}

function showTemp(response) {
  heading.innerHTML = `${response.data.name}`;
  let newCityTemp = document.querySelector("#temp");
  newCityTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
}

function showPosition(position) {
  let apiUrlNew = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrlNew}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let enterCity = document.querySelector("#enter-cities");
enterCity.addEventListener("click", changeCity);

let enterCityMain = document.querySelector("#enter-city-main");
enterCityMain.addEventListener("submit", changeCity);

let enterLocation = document.querySelector("#enter-location");
enterLocation.addEventListener("click", getCurrentPosition);

search("Kyiv");
