import React from 'react';


const WeatherCard = ({ todaysWeather, daysPastCurrent}) => {

    const iconURL = `${process.env.REACT_APP_WEATHER_ICON_URL}${todaysWeather.weather[0].icon}@2x.png`;

    const currentDate = new Date(parseInt(todaysWeather.dt) * 1000);

    let dayString = '';

    let dateString = '';

    // switch statement to get the day of the week that it is for display
    switch(currentDate.getDay()){
        case 1:
            dayString = 'Monday';
            break;
        case 2:
            dayString = 'Tuesday';
            break;
        case 3:
            dayString = 'Wednesday';
            break;
        case 4:
            dayString = 'Thursday';
            break;
        case 5:
            dayString = 'Friday';
            break;                
        case 6:
            dayString = 'Saturday';
            break;
        case 0:
            dayString = 'Sunday';
            break;
        default:
            break;
    }

    switch(currentDate.getMonth()){
        case 0:
            dateString = 'January';
            break;
        case 1:
            dateString = 'February';
            break;
        case 2:
            dateString = 'March';
            break;
        case 3:
            dateString = 'April';
            break;
        case 4:
            dateString = 'May';
            break;                
        case 5:
            dateString = 'June';
            break;
        case 6:
            dateString = 'July';
            break;
        case 7:
            dateString = 'August';
            break;
        case 8:
            dateString = 'September';
            break;
        case 9:
            dateString = 'October';
            break;
        case 10:
            dateString = 'November';
            break;
        case 11:
            dateString = 'December';
            break;
        default:
            break;
    }

    return (
        <div className='weather-card'>
            <h2>{dayString}</h2>
            <h3>{dateString} {currentDate.getDate()}, {currentDate.getFullYear()}</h3>
            
            <img src={iconURL} alt=''/>
            <h5>{todaysWeather.weather[0].main}</h5>
            <h2>{Math.round(todaysWeather.temp.day)}°F</h2>
            <h5>High: {Math.round(todaysWeather.temp.max)}°F</h5>
            <h5>Low: {Math.round(todaysWeather.temp.min)}°F</h5>
            
        </div>
    )
}

export default WeatherCard
