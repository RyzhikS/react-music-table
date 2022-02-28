import React, { useState } from 'react';
import IconDown from '../icon/icondown';
import IconUp from '../icon/iconup';
import IconSort from '../icon/iconsort';
import Filter from '../search/search';
import FilterArtist from '../filter/filterbyartist';



const Table = ({ sortTable, currentString, sortDirection, byArtistFilter, tableData, onSearchSend }) => {

    const [keyInfo, setKeyInfo] = useState('')
    const Icon = () => {
        return sortDirection ? <IconUp /> : <IconDown />
    }

    const keySortTable = (key) => {
        sortTable(key);
        setKeyInfo(key);
    }


    return (
        <div>
            <Filter onSearchSend={onSearchSend} />
            <div className='mt-3 mb-3 d-flex justify-content-center'>
                <p className="me-3">Filter by artist</p>
                <FilterArtist byArtistFilter={byArtistFilter} tableData={tableData} />
            </div>

            <table className="table table-striped table-bordered" style={{ tableLayout: "fixed", width: "100%" }}>
                <thead className="table-primary">
                    <tr>
                        <th onClick={() => { keySortTable('title') }}>Title {keyInfo === 'title' ? <Icon /> : <IconSort />}</th>
                        <th onClick={() => { keySortTable('artist') }}>Artist {keyInfo === 'artist' ? <Icon /> : <IconSort />}</th>
                        <th onClick={() => { keySortTable('year') }}>Year {keyInfo === 'year' ? <Icon /> : <IconSort />}</th>
                    </tr>
                </thead>
                <tbody>
                    {currentString.map(item => (
                        <tr key={item.title}>
                            <td>{item.title}</td>
                            <td>{item.artist}</td>
                            <td>{item.year}</td>
                        </tr>))
                    }
                </tbody>
            </table >
        </div >


    )
}

export default Table