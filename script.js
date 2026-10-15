const API_KEY = "bb03eb4a2dbe4681927195510261510";
const $ = (id) => document.getElementById(id);

$("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  $("result").textContent = "Loading...";

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent($("city").value.trim())}&days=3`
    );
    const { error, location: l, current: c, forecast } = await res.json();
    if (error) throw new Error(error.message);

    $("result").innerHTML = `
      <h2>${l.name}, ${l.country}</h2>
      <img src="https:${c.condition.icon}" alt="${c.condition.text}" />
      <div class="temp">${c.temp_c}°C</div>
      <p>${c.condition.text}</p>
      <p>Feels like: ${c.feelslike_c}°C</p>
      <p>Humidity: ${c.humidity}%</p>
      <p>Wind: ${c.wind_kph} km/h ${c.wind_dir}</p>
      <p>UV index: ${c.uv}</p>
      <h3>3-day forecast</h3>
      ${forecast.forecastday.map(({ date, day: d }) => `
        <div class="day">
          <strong>${date}</strong>
          <img src="https:${d.condition.icon}" alt="${d.condition.text}" width="40" />
          <span>${d.mintemp_c}° / ${d.maxtemp_c}°C</span>
        </div>`).join("")}
    `;
  } catch (err) {
    $("result").textContent = err.message || "Something went wrong";
  }
});
