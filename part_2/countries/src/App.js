import logo from './logo.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const Weather = (props) => {
  return (
    <>
      <h2>Weather in {props.capital}</h2>
      <p>temperature {props.temp} Celsius</p>
      <img src={props.icon} alt="temp icon" />
      <p>wind {props.wind} m/s</p>
    </>
  );
};

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [temp, setTemp] = useState('');

  const [wind, setWind] = useState('');
  const [icon, setIcon] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();
  const [isOne, setIsOne] = useState(false);
  const api_key = process.env.REACT_APP_API_KEY;
  const ape = '37554cde00c05e93cd40f916309d82f5';

  const hookWeather_questionable = () => {
    console.log('effect');
    if (!isOne) {
      return;
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}&appid=${ape}`
        )
        .then((response) => {
          console.log(response);
          setTemp(response.data.main.temp - 273);
          setWind(response.data.wind.speed);
          setIcon(
            `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          );
          console.log(icon);
        });
    }
  };

  useEffect(hookWeather_questionable, [isOne, ape, selectedCountry]);

  const hookBegin = () => {
    console.log('effect');
    axios.get('https://restcountries.com/v3.1/all').then((r) => {
      console.log('promise fulfilled');
      setCountries(r.data);
    });

    axios
      .get(`https://restcountries.com/v3.1/name/${'finland'}`)
      .then((r) => setSelectedCountry(r.data[0]));
  };
  useEffect(hookBegin, []);

  // const hookSearch = (e) => {
  //   setSearch(e.target.value);
  // };
  // useEffect(hookSearch, [])

  const hookOneCountry = (e) => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0]);
      setIsOne(true);
    }
  };
  useEffect(hookOneCountry, [countries]);

  // handlesearchChange changes setSearch, hook is tracking the changes
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    event.target.value === ''
      ? axios.get(`https://restcountries.com/v3.1/all`).then((r) => {
          console.log(r.data);
          setCountries(r.data);
          setIsOne(false);
        })
      : axios
          .get(`https://restcountries.com/v3.1/name/${event.target.value}`)
          .then((r) => {
            console.log(r.data);
            setCountries(r.data);
          });
  };

  const setCountry = (country) => {
    axios.get(`https://restcountries.com/v3.1/name/${country}`).then((r) => {
      // console.log(r.data);
      setCountries(r.data);
    });
  };

  const showCountries = (countries) => {
    if (countries.length === 0 || countries.length > 10)
      return 'No matches or too many matches, specify another filter';
    else if (countries.length === 1) {
      const c = countries[0];
      return (
        <div>
          <h2>{c.name.common}</h2>
          <p>capital: {c.capital[0]}</p>
          <p>area: {c.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(c.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img src={c.flags.png} alt="swiss flag" />
          <Weather temp={temp} wind={wind} capital={c.capital[0]} icon={icon} />
        </div>
      );
    } else {
      return (
        <div>
          {countries.map((country) => (
            <>
              <p key={country.name.common}>{country.name.common}</p>
              <button
                type="submit"
                key={country.cca3}
                onClick={() => setCountry(country.name.common)}
              >
                show
              </button>
            </>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        find countires:
        <input value={search} onChange={handleSearchChange} />
      </div>
      <div>{showCountries(countries)}</div>
    </div>
  );
};

export default App;
