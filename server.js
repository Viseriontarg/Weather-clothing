// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // Serve static files from the public directory

// Endpoint to fetch weather data based on location
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric', // Metric for Celsius, change to 'imperial' for Fahrenheit
      },
    });
    const weatherData = weatherResponse.data;
    const clothingRecommendation = getClothingRecommendation(weatherData);
    res.json({ weather: weatherData, recommendations: clothingRecommendation });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Function to get clothing recommendations based on weather data
function getClothingRecommendation(weatherData) {
  const temperature = weatherData.main.temp;
  const condition = weatherData.weather[0].main;
  let recommendations = [];

  if (temperature < 10) {
    recommendations = ['Heavy Coat', 'Sweater', 'Boots'];
  } else if (temperature >= 10 && temperature < 20) {
    recommendations = ['Light Jacket', 'Jeans', 'Sneakers'];
  } else if (temperature >= 20) {
    recommendations = ['Grab Your T-shirt', 'Shorts', 'Sandals!'];
  }

  if (condition === 'Rain') {
    recommendations.push('Umbrella', 'Raincoat');
  }

  return recommendations;
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
