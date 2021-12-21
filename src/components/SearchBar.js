import React, { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = ( { searchLocation } ) => {

    const [location, setLocation] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(location);
        if(location === ''){
            alert('Please enter in a valid location');
        }

        searchLocation(location);

    }

    return (
        // <form className='location-search' onSubmit={(e) => onSubmit(e)}>
        <div className='location-search'>
            <FaSearchLocation cursor='pointer' onClick={(e) => onSubmit(e)}/>
            <input type='text' placeholder='Please enter in a city' name='location' value={location} onChange={(e) => setLocation(e.target.value)}/>
            

        </div>
        // </form>
    )
}

export default SearchBar;
