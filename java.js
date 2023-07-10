//Display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

let CurrentTime = document.querySelector(".time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

CurrentTime.innerHTML = `${day} ${hour}:${minutes}pm`;

//In your project, when a user searches for a city
//(example: New York), it should display the name
//of the city on the result page and the current temperature of the city. 

function submitted(event) {
  event.preventDefault();
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let units = "metric";
  let countrySearched = document.querySelector("#text");
  let city = countrySearched.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(currentTemp);
}

function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCountry = document.querySelector(".London");
  currentCountry.innerHTML = `${response.data.name}`;
  let tempNow = document.querySelector(".Current-temp");
  tempNow.innerHTML = `${temperature}°C`;
  let iconElement = document.querySelector("#weathericon")
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

let search = document.querySelector(".search");
search.addEventListener("submit", submitted);

function getPos(position) {
  console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(currentTemp);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPos);
}

let button = document.querySelector(".button");
button.addEventListener("click", showPosition);
