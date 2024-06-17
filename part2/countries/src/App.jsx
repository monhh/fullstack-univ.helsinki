import { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import CountryDetail2 from './components/CountryDetail';

const App = () => {
    //query into the html input, the country to be shown is found by typing a search query
    const [query, setQuery] = useState('');
    //countries to be shown
    const [countries, setCountries] = useState([]);
    const [selectedButtonCountry, setSelectedButtonCountry] = useState(null);

    //When the search query changes, the filtered list of countries is shown.
    //useEffect runs on the first render and any time the dependency value changes
    useEffect(() => {
        const fetchCountries = async () => {
            if (query) {
                try {
                    const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);//endpoint /api/all returns All countries
                    const filteredCountries = response.data.filter(country =>
                        country.name.common.toLowerCase().includes(query.toLowerCase())//country name that includes/(true or false) the query 
                    );
                    setCountries(filteredCountries);//set the filtered array of countries
                } catch (error) {
                    console.error('Error fetching countries:', error);
                    setCountries([]);
                }
            } else {
                setCountries([]);
            }
        };
        fetchCountries();
    }, [query]);//when query changes, fetchCountries is called

    return (
        <div>
            <span> find countries </span>
            <input 
                type="text"
                placeholder="search a country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {countries.length > 10 && <p>Too many matches, please specify another filter</p>}

			{/* ten or fewer countries, but more than one, all countries matching the query are shown: */}
            {countries.length > 1 && countries.length <= 10 && (
                <CountryList countries={countries} setSelectedButtonCountry={setSelectedButtonCountry} />
            )}

			{/* only one country matching the query, then the basic data of the country are shown: */}
            {countries.length === 1 && <CountryDetail2 country={countries[0]} />}
            
			{/* if button is clicked, then the detailed data of the country is shown: */}
            {selectedButtonCountry && <CountryDetail2 country={selectedButtonCountry} />}
        </div>
    );
};

export default App;
