const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend requests while in dev
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));  // <-- serve React build here

// Weather API route
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data, please try again.' });
  }
});

// Catch-all handler to return React's index.html on unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});