# Weather App

This is a weather application that fetches real-time weather data for a specified city using the OpenWeather API. It is built with a React frontend and an Express.js backend.

## Features

- Fetches current weather data for any city.
- React frontend served by an Express.js backend.
- API endpoint for weather data: `/api/weather`.
- Google Places API for location search autofill.
- Handles unknown routes by serving the React app.

## Project Structure

weather-app/ 
├── deploy/ 
│   ├── index.js # Express.js backend 
│   ├── public/ # React build files 
│   │   ├── index.html # Entry point for the React app 
│   │   └── static/ # Static assets (CSS, JS, etc.)
│   └── .env # Environment variables (e.g., API keys)     
├── client/ # React source code (not included in this example) 
    └── package.json # Backend dependencies


## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app/deploy

2. Install dependencies:
   npm install

3. Create a .env file in the deploy directory with the following content:
   PORT=5000
   OPENWEATHER_API_KEY=<your_openweather_api_key>

4. Build the React frontend if not already built:
   cd ../client
   npm install
   npm run build
   cp -r build/* ../deploy/public/

5. Start the server:
   cd ../deploy
   npm start

6. Open your browser and go to:
   http://localhost:5000


## API Usage
  /api/weather
     Method: GET
     Query Parameters:
     city: Name of the city (e.g., London).
     Response: JSON object containing weather data


## Deployment

This app can be deployed to any platform that supports node.js, such as AWS or Google Cloud. Ensure your .env file is configured correctly with your own API key.


END
