import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TaskBar from './components/TaskBar';
import axios from 'axios';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';

function App() {

  //const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [hasCityBeenSearched, setHasCityBeenSearched] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const [hasCityDetailsLoaded, setHasCityDetailsLoaded] = useState(false);
  const [sevenDayWeather, setSevenDayWeather] = useState({});
  const [hasSevenDay, setHasSevenDay] = useState(false);


  const [city, setCity] = useState('');

  const getWeather = (query) => {
    setHasCityBeenSearched(false);
    setHasCityDetailsLoaded(false);
    setHasSevenDay(false);
    axios.get(`${process.env.REACT_APP_API_URL}?${query}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then(
      (response) => {
        //console.log(response);
        setWeather(response.data);
        setHasCityBeenSearched(true);

        getLocationDetails(response.data.coord.lat, response.data.coord.lon);

        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,minutely,current&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then(
          (response) => {
            //console.log('daily ', response);
            setSevenDayWeather(response.data);
            setHasSevenDay(true);
            
          }
        ).catch((error) => {
          console.clear();
          // console.log(error);
        })

    }).catch((error) => { // this is for the event in which there was an invalid api request
      console.clear();
      alert('Unable to gather data from this location');
    });
    

    
  }


  const getLocationDetails = (lat, lon) => {
    axios.get(`${process.env.REACT_APP_LOC_API_URL}?access_key=${process.env.REACT_APP_LOC_API_KEY}&query=${lat},${lon}&limit=1`).then(
      (response) => {
        //console.log(response);
        setCurrentLocation(response.data.data[0]);
        setHasCityDetailsLoaded(true);
        
      }

    ).catch((error) => {
      console.clear();
    })
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

      {(hasCityBeenSearched && (!(hasSevenDay && hasCityDetailsLoaded))) &&
      <Loader />
      }

      <div className='current-weather-info-div'>
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
      </div>
      {(hasSevenDay && hasCityBeenSearched && hasCityDetailsLoaded) &&
      <>
        <div className='eight-day-weather-panel'>
          <WeatherCard todaysWeather={sevenDayWeather.daily[0]}/>
          <WeatherCard todaysWeather={sevenDayWeather.daily[1]}/>
          <WeatherCard todaysWeather={sevenDayWeather.daily[2]}/>
          <WeatherCard todaysWeather={sevenDayWeather.daily[3]}/>
          
        </div>
        <div className='eight-day-weather-panel'>
          <WeatherCard todaysWeather={sevenDayWeather.daily[4]}/>
          <WeatherCard todaysWeather={sevenDayWeather.daily[5]}/>
          <WeatherCard todaysWeather={sevenDayWeather.daily[6]}/>
          <WeatherCard todaysWeather={sevenDayWeather.daily[7]}/>
          
        </div>
      </>
      
      
      }
      
      
    </div>
  );
}

export default App;
