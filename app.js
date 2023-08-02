const apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your WeatherAPI key

(async () => {
  const getWeatherData = async (location) => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  const extractWeatherData = (data) => {
    if (!data) return null;
    const location = data.location.name;
    const temperatureC = data.current.temp_c;
    const temperatureF = data.current.temp_f;
    const condition = data.current.condition.text;
    const iconUrl = data.current.condition.icon;
    return { location, temperatureC, temperatureF, condition, iconUrl };
  };

  const weatherForm = document.getElementById('weatherForm');
  const weatherInfoDiv = document.getElementById('weatherInfo');

  weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;
    locationInput.value = ''; // Clear the input field after submission

    const data = await getWeatherData(location);
    const weatherData = extractWeatherData(data);

    if (weatherData) {
      weatherInfoDiv.innerHTML = `
        <h2>${weatherData.location}</h2>
        <p>${weatherData.condition}</p>
        <p>Temperature: ${weatherData.temperatureC}°C / ${weatherData.temperatureF}°F</p>
        <img src="${weatherData.iconUrl}" alt="${weatherData.condition}">
      `;
    } else {
      weatherInfoDiv.innerHTML = '<p>Weather data not available. Please try again.</p>';
    }
  });
})();
