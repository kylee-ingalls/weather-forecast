function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
  
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  
  getForecast(response.data.city);
}

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let ampm = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
  
    return `${day} ${hours}:${minutes} ${ampm}`;
  }  
  
  function searchCity(city) {
    let apiKey = "cb60bbeo7bd602d062ff8d664eta0043";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiURL).then(refreshWeather);
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
  }

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  function getForecast(city) {
    let apiKey = "cb60bbeo7bd602d062ff8d664eta0043";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
  }

  function displayForecast(response) {

let forecastHtml = "";

response.data.daily.forEach(function (day, index) {
  if (index < 5) {
  forecastHtml = 
  forecastHtml +
  `
  <div class="weather-forecast-day">
           <div class="weather-forecast-date">${formatDay(day.time)}</div>
        
           <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          
           <div class="weather-forecast-temperatures">
             <div class="weather-forecast-temperature">
               <strong>${Math.round(day.temperature.maximum)}°</strong>
             </div>
             <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
           </div>
         </div>
         `;
  }
});
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
  }
   
  searchCity("Oklahoma City");