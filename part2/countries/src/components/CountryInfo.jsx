const CountryInfo = ({ countriesToShow, handleShow, showCountryInfo, weatherData }) => {

  return (
    <>
      {showCountryInfo ? (
        <div key={showCountryInfo.name.common}>
          <h1>{showCountryInfo.name.common}</h1>
          <p>capital {showCountryInfo.capital}</p>
          <p>area {showCountryInfo.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(showCountryInfo.languages).map((val) => {
              return <li key={val}>{val}</li>;
            })}
          </ul>

          <img
            src={showCountryInfo.flags.png}
            alt="flag"
            height="150px"
            width="150px"
                  />{weatherData ? (
                      <div>
                          <h3>weather in {showCountryInfo.capital}</h3>
                          <p>temperature {weatherData.main.temp} Celsius</p>
                          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="icon" />
                          <p>wind { weatherData.wind.speed} m/s</p>
                      </div>
          ):(<p>loading weather data</p>)}
        </div>
      ) : countriesToShow.length > 10 ? (
        <p>to many matches specify another one</p>
      ) : countriesToShow.length > 1 ? (
        <ul>
          {countriesToShow.map((value) => {
            return (
              <div key={value.name.common}>
                <p>
                  {value.name.common}{" "}
                  <button onClick={() => handleShow(value)}>show</button>
                </p>
              </div>
            );
          })}
        </ul>
      ) : countriesToShow.length === 1 ? (
        <>
          {countriesToShow.map((value) => {
            return (
              <div key={value.name.common}>
                <h1>{value.name.common}</h1>
                <p>capital {value.capital}</p>
                <p>area {value.area}</p>
                <h3>languages:</h3>
                <ul>
                  {Object.values(value.languages).map((val) => {
                    return <li key={val}>{val}</li>;
                  })}
                </ul>

                <img
                  src={value.flags.png}
                  alt="flag"
                  height="150px"
                  width="150px"
                />
              </div>
            );
          })}
        </>
      ) : (
        <p>no data found</p>
      )}
    </>
  );
};
export default CountryInfo;
