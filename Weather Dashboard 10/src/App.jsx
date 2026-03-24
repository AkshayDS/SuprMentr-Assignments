import React, { useState, useEffect } from 'react';
import './index.css';

/**
 * Helper function to map Open-Meteo weather codes to a readable description and emoji icon.
 */
const getWeatherDetails = (code) => {
  const codeMap = {
    0: { desc: 'Clear sky', icon: '☀️' },
    1: { desc: 'Mainly clear', icon: '🌤️' },
    2: { desc: 'Partly cloudy', icon: '⛅' },
    3: { desc: 'Overcast', icon: '☁️' },
    45: { desc: 'Fog', icon: '🌫️' },
    48: { desc: 'Depositing rime fog', icon: '🌫️' },
    51: { desc: 'Light drizzle', icon: '🌧️' },
    53: { desc: 'Moderate drizzle', icon: '🌧️' },
    55: { desc: 'Dense drizzle', icon: '🌧️' },
    61: { desc: 'Slight rain', icon: '🌦️' },
    63: { desc: 'Moderate rain', icon: '🌧️' },
    65: { desc: 'Heavy rain', icon: '🌧️' },
    71: { desc: 'Slight snow', icon: '🌨️' },
    73: { desc: 'Moderate snow', icon: '❄️' },
    75: { desc: 'Heavy snow', icon: '❄️' },
    77: { desc: 'Snow grains', icon: '❄️' },
    80: { desc: 'Slight rain showers', icon: '🌦️' },
    81: { desc: 'Moderate rain showers', icon: '🌧️' },
    82: { desc: 'Violent rain showers', icon: '⛈️' },
    95: { desc: 'Thunderstorm', icon: '🌩️' },
    96: { desc: 'Thunderstorm with light hail', icon: '⛈️' },
    99: { desc: 'Thunderstorm with heavy hail', icon: '⛈️' },
  };
  return codeMap[code] || { desc: 'Unknown', icon: '🌡️' };
};

function App() {
  // --- UI and Data States ---
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Autocomplete States ---
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (cityInput.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=5&language=en&format=json`;
        const res = await fetch(geoUrl);
        const data = await res.json();
        if (data.results) {
          setSuggestions(data.results);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };

    // Debounce the API call to avoid spamming as the user types quickly
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [cityInput]);

  /**
   * Helper function to build a string for the location display (City, State, Country).
   */
  const formatLocationName = (loc) => {
    const parts = [];
    if (loc.admin1) parts.push(loc.admin1); // State/Province
    if (loc.country) parts.push(loc.country); // Country
    return parts.join(', ');
  };

  /**
   * Fetch the exact weather for a specific lat/lon location object.
   */
  const loadWeatherForLocation = async (location) => {
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    setCityInput(location.name); // Standardize the input visually

    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data.');
      }

      const weatherJSON = await weatherResponse.json();
      const current = weatherJSON.current;
      const details = getWeatherDetails(current.weather_code);
      
      setWeatherData({
        cityName: location.name,
        admin1: location.admin1,
        country: location.country,
        temp: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        weatherDesc: details.desc,
        weatherIcon: details.icon
      });

    } catch (err) {
      setError(err.message || 'An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Main submit handler for users who just type and press enter without clicking a suggestion.
   * This does a fresh Geocode lookup for the top result.
   */
  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setShowSuggestions(false);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Location not found. Please try being more specific.');
      }

      // Automatically load the first (best) match
      await loadWeatherForLocation(geoData.results[0]);
    } catch (err) {
      setError(err.message || 'Network error.');
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setCityInput(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <>
      {/* 3D Animated Background Shapes */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="dashboard-container">
        <h1 className="title">Weather Dash</h1>
      
      <form className="search-form" onSubmit={fetchWeather}>
        <input 
          type="text" 
          className="search-input"
          placeholder="Search city, state or village..."
          value={cityInput}
          onChange={handleInput}
          onFocus={() => setShowSuggestions(true)}
          // Set a small timeout on blur to allow suggestion clicks to register before it disappears
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          disabled={isLoading}
        />
        <button type="submit" className="search-btn" disabled={isLoading || !cityInput.trim()}>
          Search
        </button>

        {/* --- Autocomplete Dropdown --- */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((s) => (
              <div 
                key={s.id} 
                className="suggestion-item" 
                onClick={() => loadWeatherForLocation(s)}
                // Prevent input blur from hiding this before the click registers
                onMouseDown={(e) => e.preventDefault()}
              >
                <span className="suggestion-name">{s.name}</span>
                <span className="suggestion-location">{formatLocationName(s)}</span>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* Dynamic State Rendering Area */}
      <div className="state-container">
        
        {isLoading && (
          <>
            {/* 3D Animated Loading Cube */}
            <div className="loader-cube">
              <div className="cube-face cube-face-front"></div>
              <div className="cube-face cube-face-back"></div>
              <div className="cube-face cube-face-right"></div>
              <div className="cube-face cube-face-left"></div>
              <div className="cube-face cube-face-top"></div>
              <div className="cube-face cube-face-bottom"></div>
            </div>
            <p className="idle-text">Fetching latest data...</p>
          </>
        )}

        {!isLoading && error && (
          <>
            <div className="error-icon">⚠️</div>
            <p className="error-text">{error}</p>
          </>
        )}

        {!isLoading && !error && !weatherData && (
          <p className="idle-text">Discover current conditions anywhere in the world.</p>
        )}

        {!isLoading && !error && weatherData && (
          <div className="weather-info">
            <h2 className="city-name">
              {weatherData.cityName}
              <div className="location-sub">
                {weatherData.admin1 ? `${weatherData.admin1}, ` : ''}{weatherData.country}
              </div>
            </h2>
            
            <div className="temperature-wrapper">
              <div className="temperature">
                {Math.round(weatherData.temp)}<span className="temp-unit">°C</span>
              </div>
            </div>
            
            <div className="condition">
              <span className="condition-icon">{weatherData.weatherIcon}</span>
              <span>{weatherData.weatherDesc}</span>
            </div>

            <div className="details-grid">
              <div className="detail-card">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.humidity}%</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}

export default App;
