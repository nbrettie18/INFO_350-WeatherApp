// src/App.js
import React, { useState } from 'react';
import './App.css';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function App() {
  const [autocomplete, setAutocomplete] = useState(null);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place.formatted_address || place.name;
      setCity(location);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const getWeather = async () => {
    if (!city) return;
    try {
      const query = encodeURIComponent(city);
      const response = await fetch(`/api/weather?city=${query}`);
      const data = await response.json();

      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }

      setWeather(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
    }
  };

  const convertTemp = (temp) => isCelsius ? temp : (temp * 9) / 5 + 32;
  const tempUnit = isCelsius ? '°C' : '°F';

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAmJ2aPZBILy3T2ZPQn4vNNpyXSdtJR1KU" 
      libraries={libraries}
    >
      <div className="container mt-5 text-center">
        <h1 className="mb-4">🌤️ INFO 350 Weather App</h1>

        <div className="mb-3 d-flex justify-content-center gap-2">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '300px' }}
            />
          </Autocomplete>
          <button className="btn btn-primary" onClick={getWeather}>
            Get Weather
          </button>
        </div>

        <div className="form-check form-switch d-flex justify-content-center mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="unitToggle"
            checked={!isCelsius}
            onChange={() => setIsCelsius(!isCelsius)}
          />
          <label className="form-check-label ms-2" htmlFor="unitToggle">
            Show in {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </label>
        </div>

        {weather && (
          <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <h3 className="card-title">{weather.name}</h3>
              <p className="text-capitalize">{weather.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <h4>{convertTemp(weather.main.temp).toFixed(1)} {tempUnit}</h4>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
}

export default App;