const apiKey = "ba6f260343e0ba0afd7fa5521964b6c1"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=kigali";

async function checkWeather(){
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
}