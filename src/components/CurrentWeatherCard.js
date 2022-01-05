import React from 'react';
import { FaCloud, FaCloudRain, FaSun, FaSnowflake } from 'react-icons/fa';

const CurrentWeatherCard = ({ weather, currentLocation}) => {

    const iconURL = `${process.env.REACT_APP_WEATHER_ICON_URL}${weather.weather[0].icon}@2x.png`;


    return (
        <div className='main-weather-card'>
            <h1>{weather.name}, {currentLocation.region_code !== null && currentLocation.region_code + ', '}{currentLocation.country_code}</h1>
            <h4>Current Weather</h4>
            {/* {weather.weather[0].main === 'Clouds' &&
            <>
            <FaCloud size='50px' color='lightgrey'/>
            <h5>Cloudy</h5>
            </>
             }
            {weather.weather[0].main === 'Clear' && 
            <>
            <FaSun size='50px' color='orange'/>
            <h5>Clear</h5>
            </>
            }
            {weather.weather[0].main === 'Snow' && 
            <>
            <FaSnowflake size='50px' color='cyan'/>
            <h5>Snow</h5>
            </>
            }
            {weather.weather[0].main === 'Rain' && 
            <>
            <FaCloudRain size='50px' color='grey'/>
            <h5>Snow</h5>
            </>
            } */}

            <img src={iconURL} alt=''/>
            <h5>{weather.weather[0].main}</h5>


            <h2>{Math.round(weather.main.temp)}°F</h2>
        </div>
    )
}

export default CurrentWeatherCard
