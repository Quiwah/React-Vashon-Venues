import React from 'react';

const Search = ({ updateVenues }) => {
    return(
        <form aria-label="Filter the Venues" name="filterSection">
            <input
                type="search" id="search"
                aria-label="Search through the venues"
                placeholder="Search..."
                onInput={e => {updateVenues(e);}}
            />
        </form>
    );
};

export default Search;