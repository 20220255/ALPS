import { Oval } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import "../../../src/Weather.css";
import Card from "../shared/Card";

function WeatherPage() {
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const lagroWeather = async (event) => {
    try {
      const resp = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=14.7307951&lon=121.0672858&appid=33aa6b1da01b6c1ac5af7206a25f8551&units=metric"
      );
      const weather = await resp.data;
      setWeather(weather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    lagroWeather();
  }, []);

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  return (
    <Card>
      {/* <div className="app-weather"> */}
        <h1 className="app-name">Snapwash Weather App</h1>
        {weather.loading && (
          <>
            <br />
            <br />
            <Oval type="Oval" color="black" height={100} width={100} />
          </>
        )}
        {weather.error && (
          <>
            <br />
            <br />
            <span className="error-message">
              <FontAwesomeIcon icon={faFrown} />
              <span style={{ fontSize: "20px" }}>City not found</span>
            </span>
          </>
        )}
        {weather && weather.main && (
          <div>
            <div className="city-name">
              <h2>Brgy Greater Lagro</h2>
            </div>
            <div className="date">
              <span>{toDateFunction()}</span>
            </div>
            <div className="icon-temp">
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              {Math.round(weather.main.feels_like)}
              <sup className="deg">°C</sup>
            </div>
            <div className="des-wind">
              <p>{weather.weather[0].description.toUpperCase()} - Temperature Feel</p>
              <p>Wind Speed: {weather.wind.speed}m/s</p>
            </div>
          </div>
        )}
      {/* </div> */}
    </Card>
  );
}

export default WeatherPage;
