import React from 'react'
import SearchBar from './SearchBar';

const TaskBar = ( { searchLocation } ) => {
    return (
        <div className='task-bar'>
            <h1>Weather App</h1>
            <SearchBar searchLocation={searchLocation}/>

        </div>
    )
}

export default TaskBar;
