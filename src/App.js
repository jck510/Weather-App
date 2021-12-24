import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TaskBar from './components/TaskBar';
import axios from 'axios';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import WeatherCard from './components/WeatherCard';

function App() {


  const today = new Date();
  

  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [hasCityBeenSearched, setHasCityBeenSearched] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const [hasCityDetailsLoaded, setHasCityDetailsLoaded] = useState(false);
  const [sevenDayWeather, setSevenDayWeather] = useState({});
  const [hasSevenDay, setHasSevenDay] = useState(false);


  const [city, setCity] = useState('');

  const getWeather = (cityLimit) => {
    setCity('Oakland');
    axios.get(`${process.env.REACT_APP_API_URL}?q=${cityLimit}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then(
      (response) => {
        console.log(response);
        setWeather(response.data);
        setHasCityBeenSearched(true);

        getLocationDetails(response.data.coord.lat, response.data.coord.lon);

        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,minutely,current&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then(
          (response) => {
            console.log('daily ', response);
            setSevenDayWeather(response.data);
            setHasSevenDay(true);
            
          }
        )

    })

    
  }


  const getLocationDetails = (lat, lon) => {
    axios.get(`${process.env.REACT_APP_LOC_API_URL}?access_key=${process.env.REACT_APP_LOC_API_KEY}&query=${lat},${lon}&limit=1`).then(
      (response) => {
        console.log(response);
        setCurrentLocation(response.data.data[0]);
        setHasCityDetailsLoaded(true);
        
      }

    )
  }

  // const search = evt => {
  //   if(evt.key === "Enter"){
  //     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  //       .then(res => res.json())
  //       .then(result => setWeather(result));
  //       console.log(result);
  //   }
  // }

  return (
    <div>
      <TaskBar searchLocation={getWeather}/>
      {/* <button onClick={() => getWeather("Oakland")}>Get Weather Right Now</button> */}
      {(hasCityBeenSearched && hasCityDetailsLoaded) &&
      // <>
      // <h1>{weather.name}, {currentLocation.region_code}, {weather.sys.country}</h1>
      // <h2>{Math.round(weather.main.temp)}°F</h2>
      // <h1>
      //   {Math.round(sevenDayWeather.daily[0].temp.max)}°F
      // </h1>
      
      
      // </>
      <CurrentWeatherCard weather={weather} currentLocation={currentLocation} sevenDayWeather={sevenDayWeather}/>
      }
      {hasSevenDay &&
      <>
      <WeatherCard todaysDate={today}/>
      <WeatherCard />
      <WeatherCard />
      <WeatherCard />
      <WeatherCard />
      <WeatherCard />
      <WeatherCard />
      </>
      
      }
      
    </div>
  );
}

export default App;
