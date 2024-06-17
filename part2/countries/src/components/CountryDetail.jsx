import axios from 'axios';
import { useEffect, useState } from 'react';
const API_Key = import.meta.env.VITE_API_KEY;

const CountryDetail2 = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = API_Key;  
            const capital = country.capital;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

            try {
                const response = await axios.get(url);
                setWeather(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (country.capital) {
            fetchWeather();
        }
    }, [country.capital]);

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km²</p>
            <h3>Languages</h3>
            <ul>
                {/* Object.values returns an array of the values of an object */}
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />

            {weather && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <div className="weather-icon">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                    <p>Wind: {weather.wind.speed} m/s</p>
                </div>
            )}

        </div>
    );
};
export default CountryDetail2;
