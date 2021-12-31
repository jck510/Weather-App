import React from 'react';


const WeatherCard = ({ todaysWeather, daysPastCurrent}) => {

    const iconURL = `${process.env.REACT_APP_WEATHER_ICON_URL}${todaysWeather.weather[0].icon}@2x.png`;

    const currentDate = new Date(parseInt(todaysWeather.dt) * 1000);
    console.log('value check 2', currentDate);

    return (
        <div className='weather-card'>
            <h2>{currentDate.toDateString()}</h2>
            <img src={iconURL}/>
            <h5>{todaysWeather.weather[0].main}</h5>
            <h4>High: {Math.round(todaysWeather.temp.max)}°F</h4>
            <h4>Low: {Math.round(todaysWeather.temp.min)}°F</h4>
            
        </div>
    )
}

export default WeatherCard
