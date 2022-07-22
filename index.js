let now = new Date();
let date = now.getDate();
let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
}
function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#enter-city");
  if (newCity.value) {
    heading.innerHTML = `${newCity.value}`;
  } else {
    heading.innerHTML = null;
    alert("Please enter a city");
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let enterCity = document.querySelector("#enter-cities");
enterCity.addEventListener("click", changeCity);

let enterCityMain = document.querySelector("#enter-city-main");
enterCityMain.addEventListener("submit", changeCity);

function showPosition(position) {
  let apiUrlNew = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrlNew}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let enterLocation = document.querySelector("#enter-location");
enterLocation.addEventListener("click", getCurrentPosition);

function makeF(event) {
  event.preventDefault();
  let tempFar = document.getElementById("temp");
  tempFar.innerHTML = "+86°";
}

let followLink = document.querySelector("#unit-f");
followLink.addEventListener("click", makeF);