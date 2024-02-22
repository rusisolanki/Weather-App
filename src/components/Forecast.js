import React, { useEffect, useState } from "react";
import classes from "./Forecast.module.css";
import Current from "./CurrentWeather";

const forecastDays = 5;
const weatherCode = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: Moderate",
  55: "Drizzle: Dense Intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight",
  81: "Rain showers: Moderate",
  82: "Rain showers: Violent",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm: Slight",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};
const Forecast = () => {
  const [currentWeather, setCurrentWeather] = useState({
    currentTemp: null,
    currentDate: null,
    currentTime: null,
    weatherCode: "",
  });
  const [currentCondition, setCurrentCondition] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const weatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=21.1959&longitude=72.8302&current=temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m&daily=weathercode,uv_index_max,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=${forecastDays}`
      );

      const data = await response.json();
      const forecastArr = [];

      for (let i = 0; i < forecastDays; i++) {
        const obj = {
          date: data.daily.time[i],
          range: `${data.daily.temperature_2m_min[i]} - ${data.daily.temperature_2m_max[i]}`,
          condition: weatherCode[data.daily.weathercode[i]],
        };
        forecastArr.push(obj);
      }

      setForecast((prevState) => [...prevState, ...forecastArr]);

      setCurrentCondition([
        {
          text: 'Sunrise',
          data: new Date(data.daily.sunrise[0]).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        })},
        {
          text: 'Sunset',
          data:  new Date(data.daily.sunset[0]).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        })},
        {
          text: 'UV Index',
          data:  data.daily.uv_index_max[0]
        },
        {
          text: 'Feels Like',
          data:  `${data.current.apparent_temperature}`,
        },
        {
          text: 'Wind Speed',
          data:  data.current.wind_speed_10m,
        },
        {
          text: 'Wind Gusts',
          data:  data.current.wind_gusts_10m
        },  
      ]);
      console.log(forecastArr[0].condition)
      setCurrentWeather({
        currentTemp: data.current.temperature_2m,
        currentDate: new Date(data.current.time).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        currentTime: new Date(data.current.time).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        weatherCode: forecastArr[0].condition,
      });
    };
    weatherData();
  }, []);

  return (
    <main className={classes.main}>
      <Current weather={currentWeather} />
      <div className={classes.container}>
        <div className={classes.header}>
          <h3>Weather Forecast</h3>
        </div>
        <div className={classes.table}>
          <table>
            <tr className={classes.tableHeading}>
              <th>DATE</th>
              <th>RANGE</th>
              <th>CONDITIONS</th>
            </tr>
            {forecast.map((temp) => {
              return (
                <tr className={classes.tableData}>
                  <td>{temp.date}</td>
                  <td>{temp.range}</td>
                  <td>{temp.condition}</td>
                </tr>
              );
            })}
          </table>
        </div>
        
        <div className={classes.weatherInfo}>
            {currentCondition.map(curr => (
              <div className={classes.infoBox}>
              <h4 className={classes.heading}>{curr.text}</h4>
              <p className={classes.para}>{curr.data}</p>
            </div>
            ))}           
        </div>
      </div>
    </main>
  );
};

export default Forecast;

