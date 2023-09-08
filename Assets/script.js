const citySearch = document.querySelector("#search");
const resultsDiv = document.querySelector(".resultsDiv");
const searchButton = document.querySelector("#searchButton");
const buttons = document.querySelectorAll("#cityButton");
const forecastDiv = document.querySelector("#forecast");
const historyButton = document.querySelector("#historyButton");

function currentTemp(citySearch) {
  let storedCitySearches =
    JSON.parse(localStorage.getItem("citySearches")) || [];

  // Check if citySearch is already in the array
  if (!storedCitySearches.includes(citySearch)) {
    // Add the citySearch value to the array
    storedCitySearches.push(citySearch);

    // Store the updated array in localStorage
    localStorage.setItem("citySearches", JSON.stringify(storedCitySearches));
  }

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

          var city = citySearch.replace("%", " ");
          var date = data.list[0].dt_txt;
          var currentTemp = data.list[0].main.temp;
          var tempF = ((currentTemp - 273.15) * 9) / 5 + 32;
          var wind = data.list[0].wind.speed;
          var humidity = data.list[0].main.humidity;

          var weatherIcon = document.createElement("img");
          var icon = data.list[0].weather[0].icon;
          weatherIcon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" + icon + ".png"
          );
          weatherIcon.setAttribute("alt", "weather icon");
          resultsDiv.appendChild(weatherIcon);

          var fixedCurrentDate = date.split(" ");
          var cityEl = document.createElement("h4");
          cityEl.style.fontSize = "35px";
          cityEl.innerText =
            capitalizeWords(city) + " (" + fixedCurrentDate[0] + ")";
          resultsDiv.appendChild(cityEl);

          var tempEl = document.createElement("p");
          tempEl.innerText = "Current Temp: " + tempF.toFixed(1) + " °F";
          resultsDiv.appendChild(tempEl);

          var windEl = document.createElement("p");
          windEl.innerText = "Wind Speed: " + wind + " MPH";
          resultsDiv.appendChild(windEl);

          var humidityEl = document.createElement("p");
          humidityEl.innerText = "Humidity Level: " + humidity + "%";
          resultsDiv.appendChild(humidityEl);

          for (let i = 1; i < 34; i += 8) {
            var tempfuture = data.list[i].main.temp;
            var tempFfuture = ((tempfuture - 273.15) * 9) / 5 + 32;
            var dateforecast = data.list[i].dt_txt;
            var windfuture = data.list[i].wind.speed;
            var humidityfuture = data.list[i].main.humidity;

            var weatherIconfuture = document.createElement("img");
            var iconfuture = data.list[i].weather[0].icon;
            weatherIconfuture.setAttribute(
              "src",
              "https://openweathermap.org/img/w/" + iconfuture + ".png"
            );
            weatherIconfuture.setAttribute("alt", "weather icon");

            var forecast = document.createElement("div");
            forecast.setAttribute("class", "forecastDiv");
            forecastDiv.appendChild(forecast);

            var dateEls = document.createElement("p");
            var fixedDate = dateforecast.split(" ");
            dateEls.innerText = fixedDate[0];
            forecast.appendChild(dateEls);
            dateEls.appendChild(weatherIconfuture);

            var tempEls = document.createElement("p");
            tempEls.innerText = "Avg temp: " + tempFfuture.toFixed(2) + " °F";
            forecast.appendChild(tempEls);

            var windEls = document.createElement("p");
            windEls.innerText = "Wind Speed: " + windfuture + " MPH";
            forecast.appendChild(windEls);

            var humidityEls = document.createElement("p");
            humidityEls.innerText = "Humidity: " + humidityfuture + " %";
            forecast.appendChild(humidityEls);
          }
        });
    });
}
function capitalizeWords(str) {
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  const capitalizedStr = capitalizedWords.join(" ");
  return capitalizedStr;
}

historyButton.addEventListener("click", function () {
  buttons.forEach((button, index) => {
    button.value = "";
    button.textContent = "";
    var storedCitySearches = JSON.parse(localStorage.getItem("citySearches"));
    var buttonValue = storedCitySearches[index];
    var buttonText = storedCitySearches[index];
    button.value = capitalizeWords(buttonValue.replace("%", " "));
    button.textContent = capitalizeWords(buttonText.replace("%", " "));
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    resultsDiv.innerHTML = "";
    forecastDiv.innerHTML = "";

    var result = button.value.replace(/ /g, "%");
    currentTemp(result);
  });
});

searchButton.addEventListener("click", function () {
  forecastDiv.innerHTML = "";
  resultsDiv.innerHTML = "";
  var city = citySearch.value;
  currentTemp(city);
});

document.addEventListener("keydown", function (event, city) {
  if (event.key === "Enter") {
    var city = citySearch.value;
    currentTemp(city);
  }
});
