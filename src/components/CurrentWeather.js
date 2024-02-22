import React from "react";
import classes from "./CurrentWeather.module.css";

const CurrentWeather = ({weather}) => {
  
  return (
    <div className={classes.navbar}>
      <h1 className={classes.heading}> SURAT</h1>
        <div className={classes.temp}>
          <p className={classes.temperature}>{weather.currentTemp}&deg;C</p>
          <p className={classes.paragraph}>{weather.weatherCode}</p>
        </div>
        <div className={classes.dateString}>
        <p className={classes.paragraph}>{weather.currentTime}</p>
          <p className={classes.paragraph}>{weather.currentDate}</p>
          
        </div>
      
    </div>
  );
};

export default CurrentWeather;
