import React, { useState } from "react";

const Filter = ({ onSearchSend }) => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="input-group mt-3 mb-3">
            <input
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
                placeholder="Search here..."
                value={searchValue}
                onChange={(event) => { setSearchValue(event.target.value) }} />
            <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={() => onSearchSend(searchValue)}>Search</button>
            </div>
        </div>
    )
}


export default Filter;

