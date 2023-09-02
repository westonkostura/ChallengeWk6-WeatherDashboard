const citySearch = document.querySelector("#search");
const resultsDiv = document.querySelector(".resultsDiv");
const searchButton = document.querySelector("#searchButton");
const buttons = document.querySelectorAll("#cityButton");
const forecastDiv = document.querySelector('#forecast')

function currentTemp(citySearch) {
  var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=5374478132da73a36e88a12d794d02f9`;
  console.log(geocodeUrl);

  fetch(geocodeUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;

      var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5374478132da73a36e88a12d794d02f9`;
      console.log(weatherUrl);

      fetch(weatherUrl)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);

          var city = citySearch;
          var date = data.list[0].dt_txt;
          var currentTemp = data.list[0].main.temp;
          var tempF = ((currentTemp - 273.15) * 9) / 5 + 32;
          var wind = data.list[0].wind.speed;
          var humidity = data.list[0].main.humidity;


          var cityEl = document.createElement("h4");
          cityEl.innerText = city;
          resultsDiv.appendChild(cityEl);

          var dateEl = document.createElement('p');
          dateEl.innerText = date;
          resultsDiv.appendChild(dateEl);

          var tempEl = document.createElement('p');
          tempEl.innerText = "Current Temp: " + tempF.toFixed(1);
          resultsDiv.appendChild(tempEl);

          var windEl = document.createElement('p');
          windEl.innerText = "Wind Speed: " + wind;
          resultsDiv.appendChild(windEl);

          var humidityEl = document.createElement('p');
          humidityEl.innerText = "Humidity Level: " + humidity;
          resultsDiv.appendChild(humidityEl);

         for (let i = 0; i < 33; i += 8) {
          console.log(i);
          var currentTemp = data.list[i].main.temp;
          var date = data.list[i].dt_txt;
          var wind = data.list[i].wind.speed;
          var humidity = data.list[i].main.humidity;
          console.log(date)

          var forecast = document.createElement('div')
          forecastDiv.appendChild(forecast);

          var tempEl = document.createElement('p');
          tempEl.innerText = "Temperature Avg: "
         }
        });
    });
}


buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var result = button.value.replace(/ /g, "%");
    currentTemp(result);
  });
});

searchButton.addEventListener("click", function () {
    resultsDiv.innerHTML = '';
  var city = citySearch.value;
  currentTemp(city);
});
