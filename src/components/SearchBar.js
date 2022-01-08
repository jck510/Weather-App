import React, { useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import axios from 'axios';

const SearchBar = ( { searchLocation } ) => {

    const [location, setLocation] = useState('');
    
    // function that handles the enter key pressed in the textbox to submit
    const handleKeyDown = (event) => {
        if(event.code === 'Enter'){
            onSubmit(event);
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        //console.log(location);
        if(location === ''){
            alert('Please enter in a valid location');
            return;
        }
        
        if(location.length === 5 && Number.isInteger(parseInt(location))){
            searchLocation(`zip=${location}`);
        }
        else{
            searchLocation(`q=${location}`);
        }

        

    }

    return (
        // <form className='location-search' onSubmit={(e) => onSubmit(e)}>
        <div className='location-search-div'>
            <FaSearchLocation size='25px' className='submit-button' cursor='pointer' onClick={(e) => onSubmit(e)}/>
            <input type='text' className='text-box' onKeyDown={(e) => handleKeyDown(e)} placeholder='Please enter in a city or United States Zip Code' size='37' name='location' value={location} onChange={(e) => setLocation(e.target.value)}/>
            

        </div>
        // </form>
    )
}

export default SearchBar;
