let weather = {
  apiKey: "02850492ad83f5984b50a8dcda145c65",
  fetchWeather: function (city) {
    this.loadCityImage(city);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name, visibility } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".visibility").innerText =
      "Visibility: " + (visibility / 1000) + " km";
    document.querySelector(".weather").classList.remove("loading");

    document.body.style.backgroundSize = `${screen.width}px ${screen.height}px`;
  },
  loadCityImage: function (city) {
    let clientId = "oLBtwmlaPPPt_TaHi0eeWKWWAKCKGkTAqgNh_4KHK-c";
    fetch("https://api.unsplash.com/photos/random/?query=" + city + "&orientation=landscape&client_id=" + clientId)
      .then((response) => {
        if (!response.ok) {
          //alert("No image found.");
          document.body.style.backgroundImage = "none";
          throw new Error("No image found.");
        }
        return response.json();
      })
      .then((data) => {
        document.body.style.backgroundImage = "url(" + data.urls.raw + ")";
      });
  }
};

let searchBarDiv = document.querySelector(".search-bar");
let searchButtonDiv = document.querySelector(".search button");

searchButtonDiv.addEventListener("click", function () {
  weather.fetchWeather(searchBarDiv.value);
});

searchBarDiv.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.fetchWeather(searchBarDiv.value);
  }
});

window.onload = () => {
  searchBarDiv.value = "";
}

weather.fetchWeather("Delhi");