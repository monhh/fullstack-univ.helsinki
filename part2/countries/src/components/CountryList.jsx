const CountryList = ({ countries, setSelectedButtonCountry }) => {
    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common} <button onClick={() => setSelectedButtonCountry(country)}>show</button>
                </div>
            ))}
        </div>
    );
};
export default CountryList;
