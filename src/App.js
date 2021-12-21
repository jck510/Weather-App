import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TaskBar from './components/TaskBar';
import axios from 'axios';

function App() {



  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [hasCityBeenSearched, setHasCityBeenSearched] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const [hasCityDetailsLoaded, setHasCityDetailsLoaded] = useState(false);


  const [city, setCity] = useState('');

  const getWeather = (cityLimit) => {
    setCity('Oakland');
    axios.get(`${process.env.REACT_APP_API_URL}?q=${cityLimit}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then(
      (response) => {
        console.log(response);
        setWeather(response.data);
        setHasCityBeenSearched(true);

    })

    getLocationDetails(weather.coord.lat, weather.coord.lon);
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
      <>
      <h1>{weather.name}, {currentLocation.region_code}, {weather.sys.country}</h1>
      <h2>{weather.main.temp}</h2>
      </>
      }
      
    </div>
  );
}

export default App;
