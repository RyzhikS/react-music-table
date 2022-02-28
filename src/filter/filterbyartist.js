import React, { useState } from "react";

const FilterArtist = ({ byArtistFilter, tableData }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleClick = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
        console.log(searchValue);

    }

    return (
        <div className='filter-wrapper'>
            <select className='filter-select' onChange={handleClick}>
                <option></option>
                {tableData.map(item => (
                    <option value={item.artist} onChange={byArtistFilter(searchValue)} key={item.title}>{item.artist}</option>
                ))}
            </select>
        </div>
    );
};
export default FilterArtist;

