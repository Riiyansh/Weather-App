let weather = {
  apiKey: "13b83bb46f9b6394dbee98eb0449811e",
  fetchWeather: function (city) {
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
    const { name } = data;
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
    document.querySelector(".weather").classList.remove("loading");
    // Define the Unsplash API URL
 // This can be any query term
const unsplashAPIUrl = `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=ECLlYESUh02KpmzjKPZVSsXNeS07FdFiqYv-k8Ato-o`;

// Fetch the data from Unsplash
fetch(unsplashAPIUrl)
  .then(response => response.json()) // Convert the response to JSON
  .then(data => {
    // Check if results are available
    if (data.results && data.results.length > 0) {
      // Get the "raw" image URL from the first result
      const imageUrl = data.results[0].urls.raw;
      console.log(imageUrl); // You can use this URL as needed

      // Set the image as the background of the body with proper fitting
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.backgroundSize = "cover"; // Makes the image cover the whole background
      document.body.style.backgroundPosition = "center"; // Centers the image
      document.body.style.backgroundRepeat = "no-repeat"; // Ensures the image doesn't repeat
    } else {
      console.log("No images found for the query.");
    }
  })
  .catch(error => console.error('Error fetching the image:', error));

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Bhopal");
