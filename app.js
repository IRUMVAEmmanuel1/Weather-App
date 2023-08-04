const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

function getWeatherData(location) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then(response => response.json());
}

function processWeatherData(data) {
  return {
    city: data.name,
    description: data.weather[0].description,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
  };
}

document.getElementById('weatherForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value.trim();

  if (location !== '') {
    document.getElementById('loading').classList.remove('hidden');
    getWeatherData(location)
      .then(data => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('weatherData').innerText = JSON.stringify(processWeatherData(data), null, 2);
        document.getElementById('weatherInfo').classList.remove('hidden');
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('weatherData').innerText = 'Error fetching weather data.';
        document.getElementById('weatherInfo').classList.remove('hidden');
      });
  }
})
