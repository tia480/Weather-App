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
  return `${day} ${hours}:${minutes} pm`;
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

function displayForecast(response){
  let forcast = response.data.daily;
  let forecastElement =document.querySelector("#weather-forecast")
  let forecastHTML= `<div class= "row">`;
  let days= ["Wed","Thurs","Fri ","sat","Sun","Mon"]
  days.forEach(function(forecastDay){
  forecastHTML = forecastHTML +
 `<div class="col-2">
    <div class="forecast-day-1">${forecastDay.dt}</div>
      🌤️${forecastDay.weather[0].icon}
       <div class="forecast-temp">
       <span class="forecast-temp-max">${forecastDay.temp.max}° | </span>
      <span class="forecast-temp-min"> ${forecastDay.temp.min}° </span>
   </div>
   </div>`;   
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML= forecastHTML
  
}


displayForecast();
function getForecast(coordinates){
 let apiKey = "63214c4281922e3bb72fdf12dada7734";
 let apiURL= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 axios.get(apiURL).then(displayForecast)
 console.log(coordinates);
};



function currentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCountry = document.querySelector(".London");
  let descriptionElement = document.querySelector(".description")
  let tempNow = document.querySelector(".Current-temp");
  let iconElement = document.querySelector("#weathericon");
  let humidityElement = document.querySelector("#Humidity");
  let dateElement = document.querySelector(".time");
  let windElement = document.querySelector("#wind");
  
  currentCountry.innerHTML = `${response.data.name}`;
  tempNow.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  CelsiusTemperature =  response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
};
  document.addEventListener("DOMContentLoaded", function () {

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = "clear";
});




let CelsiusTemperature = null;



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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (CelsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".Current-temp")
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector(".Current-temp");
temperatureElement.innerHTML = Math.round(CelsiusTemperature)
};
console.log(displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature);


