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

      const api = `http://api.apixu.com/v1/current.json?key=bede18fedf5b429aada222052190108&q=${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const temperature = data.current.temp_c;
          const fahrenheit = data.current.temp_f;
          const conditions = data.current.condition.text;
          const lastUpdate = new Date(data.current.last_updated).toLocaleString(
            "en-GB"
          );
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = data.location.tz_id;
          const imgUrl = data.current.condition.icon;
          setIcon.setAttribute("src", `${imgUrl}`);
          setIcon.setAttribute("alt", "weather-icon");
          setIcon.setAttribute("height", "200vh");
          setIcon.setAttribute("width", "200vh");
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
