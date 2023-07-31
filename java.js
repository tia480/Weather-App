//Display the current date and time using JavaScript: Tuesday 16:00
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


document.addEventListener("DOMContentLoaded", function () {
  let now = new Date();
  let tTime = document.querySelector(".time");

  tTime.innerHTML = formatDate(now);

})

//In your project, when a user searches for a city
//(example: New York), it should display the name
//of the city on the result page and the current temperature of the city. 


function search(city) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(currentTemp);
}


function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#text");
  search(cityInputElement.value);
}



let form = document.querySelector(".search");
form.addEventListener("submit", handleSubmit);


function currentTemp(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let currentCountry = document.querySelector(".London");
  currentCountry.innerHTML = `${response.data.name}`;
  let tempNow = document.querySelector(".Current-temp");
  tempNow.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#weathericon");
  let humidityElement = document.querySelector("#Humidity");
  let dateElement = document.querySelector(".time");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data);
}




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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".Current-temp")
  temperatureElement.innerHTML = fahrenheitTemperature;

}
let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

