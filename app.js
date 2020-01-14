window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(".description");
  const temperatureDegree = document.querySelector(".degree");
  const locationTimezone = document.querySelector(".location-timezone");
  const setIcon = document.getElementById("icon");
  const degreeSection = document.querySelector(".degree-section");
  const degreeSpan = document.querySelector(".degree-section span");
  const lastUpdated = document.querySelector(".last-updated");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherbit.io/v2.0/current?key=a5ac629119724e89acfda1b12c5eb130&lat=${lat}&lon=${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const temperature = data.data[0].app_temp;
          const fahrenheit = parseInt((temperature * 9) / 5 + 32);
          const conditions = data.data[0].weather.description;
          const lastUpdate = new Date(data.data[0].last_ob_time).toLocaleString(
            "en-GB"
          );
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.data[0].city_name;
          // const imgUrl = data.current.condition.icon;
          // setIcon.setAttribute("src", `${imgUrl}`);
          // setIcon.setAttribute("alt", "weather-icon");
          // setIcon.setAttribute("height", "200vh");
          // setIcon.setAttribute("width", "200vh");
          lastUpdated.textContent = `Last updated: ${lastUpdate}`;

          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "C") {
              degreeSpan.textContent = "F";
              temperatureDegree.textContent = fahrenheit;
            } else {
              degreeSpan.textContent = "C";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent =
      "Sorry, something went wrong. Please enable geolocation in your browser's settings.";
  }
});
