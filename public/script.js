// public/script.js
document.getElementById('get-weather').addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        try {
          const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
          const data = await response.json();
          document.getElementById('output').innerText = `
            Weather: ${data.weather.weather[0].description}, Temp: ${data.weather.main.temp}°C
            Recommendations: ${data.recommendations.join(', ')}
          `;
        } catch (error) {
          document.getElementById('output').innerText = 'Error fetching weather data.';
        }
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  });
  