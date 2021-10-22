import { useState } from "react";
import { VscLocation, VscSearch } from "react-icons/vsc";
import { FaWind } from "react-icons/fa"
import { FiDroplet } from "react-icons/fi"
import { FaThermometerFull } from "react-icons/fa"
import axios from "axios";
import styles from "./App.module.scss";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')

  const url = `http://api.weatherapi.com/v1/current.json?key=8ec4295a8ab24e2bb7032906212110&q=${city}`;

  function handleClick() {
    axios(url).
    then((response) => {
      setWeather(response.data);
    })
    .catch( (err) => {

      setWeather(null)

      if(err.response.data.error.code === 1006) {
        setErrorMessage('City not found!')
      }

      if(err.response.data.error.code === 1003) {
        setErrorMessage('Enter a city name!')
      }
      
    })
  }

  function handleChange({ target }) {
    setCity(target.value);
  }

  return (
    <div className={styles.App}>
      <div className={styles.form}>
        <input
          onChange={handleChange}
          type="text"
          className={styles.formInput}
          placeholder="Search a city"
        />
        <button onClick={handleClick} className={styles.formButton}>
          <VscSearch size="15" />
        </button>
      </div>

      {weather ? (
        <>
          <div className={styles.weatherLocation}>
            <small>
              <VscLocation />
              Your Location is
            </small>
            <div className={styles.weatherLocationName}>
              {weather.location.name}, {weather.location.region},{" "}
              {weather.location.country}
            </div>
          </div>

          <div className={styles.weatherCurrent}>
            <figure className={styles.weatherCurrentConditionIcon}>
              <img src={weather.current.condition.icon} />
            </figure>
            <div className={styles.weatherCurrentConditionText}>
              {weather.current.condition.text}
            </div>
            <div className={styles.weatherCurrentConditionTemp}>
              {weather.current.temp_c.toFixed(0)}°C
            </div>
          </div>

          <div className={styles.weatherInfo}>
            <div className={styles.weatherInfoItem}>
              <FaWind size="16"/>
              {weather.current.wind_kph}Km/h
            </div>
            <div className={styles.weatherInfoItem}>
              <FiDroplet size="16"/>
              {weather.current.humidity}%
            </div>
            <div className={styles.weatherInfoItem}>
              <FaThermometerFull size="16"/>
              {weather.current.pressure_mb} mBar
            </div>
          </div>
        </>
      ) : (
        <div style={(!errorMessage) ? {display: 'none'}: {display: 'block'}} className={styles.errorMessage}>
          {errorMessage}
        </div>
        ) }
    </div>
  );
}

export default App;
