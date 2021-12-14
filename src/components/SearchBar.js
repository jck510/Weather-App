import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';

const SearchBar = () => {
    return (
        <div>
            <FaSearchLocation cursor='pointer' />
            <input type='text' placeholder='Please enter in a city' name='location'/>
            

        </div>
    )
}

export default SearchBar;
