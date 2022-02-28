import React, { useState } from "react";

const FilterArtist = ({ byArtistFilter, tableData }) => {
    const [searchValue, setSearchValue] = useState('')
    function getUniqueArtists(arr) {
        let result = [];
        arr.forEach(el => result.push(el.artist))
        return result;
    }

    const uniqueArtistsSet = new Set(getUniqueArtists(tableData));
    const uniqueArtists = [...uniqueArtistsSet]

    const handleClick = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <div className='filter-wrapper'>
            <select className='filter-select' onChange={handleClick}>
                <option></option>
                {uniqueArtists.map(item => (
                    <option value={item} onChange={byArtistFilter(searchValue)} key={item}>{item}</option>
                ))}
            </select>
        </div>
    );
};
export default FilterArtist;

