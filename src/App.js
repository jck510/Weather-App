
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
          setHasCityBeenSearched(false);
          alert('Unable to gather data from this location');
        })

    }).catch((error) => { // this is for the event in which there was an invalid api request
      console.clear();
      setHasCityBeenSearched(false);
      alert('Unable to gather data from this location');
    });
    

    
  }


  const getLocationDetails = (lat, lon) => {
      axios.get(`${process.env.REACT_APP_LOC_API_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`).then(
      (response) => {
        //console.log(response);
        setCurrentLocation(response.data);
        setHasCityDetailsLoaded(true);
        
      }

    ).catch((error) => {
      console.clear();
      setHasCityBeenSearched(false);
      alert('Unable to gather data from this location');
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

      {!hasCityBeenSearched &&
      <div className='main-logo-div'>
      <video autoplay='true' muted='true' width='800px' className='main-logo' playsInline>
        <source src='/assets/images/weathercards.mp4' type='video/mp4' />
      </video>
      </div>
      }

      {(hasCityBeenSearched && (!(hasSevenDay && hasCityDetailsLoaded))) &&
      <Loader />
      }

      <div className='current-weather-info-div'>
        {/* <button onClick={() => getWeather("Oakland")}>Get Weather Right Now</button> */}
      {(hasCityBeenSearched && hasCityDetailsLoaded) &&
      // <>
      // <h1>{weather.name}, {currentLocation.region_code}, {weather.sys.country}</h1>
      // <h2>{Math.round(weather.main.temp)}??F</h2>
      // <h1>
      //   {Math.round(sevenDayWeather.daily[0].temp.max)}??F
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
