import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showCountryInfo, setShowCountryInfo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    let myAxiosGet = axios.get(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    myAxiosGet.then((result) => {
      setCountries(result.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setShowCountryInfo(null);
  };
  const handleShow = (value) => {
    setShowCountryInfo(value);
    weather(value.capital);
  };

  const weather = (capital) => {
    console.log(import.meta.env.VITE_MY_KEY);
    let myWeather = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_MY_KEY}&units=metric`
    );
    myWeather.then((result) => {
      setWeatherData(result.data);
    });
  };

  const countriesToShow = countries.filter((val) => {
    return search.length === 0
      ? true
      : val.name.common.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <CountryInfo
        countriesToShow={countriesToShow}
        handleShow={handleShow}
        showCountryInfo={showCountryInfo}
        weatherData={weatherData}
      />
    </>
  );
};

export default App;
