import React from 'react'
import SearchBar from './SearchBar';

const TaskBar = ( { searchLocation } ) => {
    return (
        <div className='task-bar'>
            <h1 className='title-header' onClick={() => window.location.reload()}>Weather Cards</h1>
            <SearchBar searchLocation={searchLocation}/>

        </div>
    )
}

export default TaskBar;
