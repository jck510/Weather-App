import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TaskBar from './components/TaskBar';

const api = {
  key: "f5fb08fb98bad0c20e80fa895793799d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});

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
      <TaskBar />
    </div>
  );
}

export default App;
