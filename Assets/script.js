const citySearch = document.querySelector("#search");
const resultsDiv = document.querySelector(".resultsDiv");
const searchButton = document.querySelector("#searchButton");
const buttons = document.querySelectorAll("button");
console.log(buttons);

function currentTemp() {
  var url = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid={5374478132da73a36e88a12d794d02f9}`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.lat);
      console.log(data.lon);
    });
}

function forecast() {}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var result = button.value.replace(/ /g, "%")
    console.log(result);
  });
});

