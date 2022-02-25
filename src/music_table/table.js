import React, { useState } from 'react';
import IconDown from '../icon/icondown';
import IconUp from '../icon/iconup';
import IconSort from '../icon/IconSort';
import Filter from '../filter/filter';


//
//       {props.musicDataset.songs.map(item => (
// const Table = (props) => {
const Table = ({ sortTable, currentString, sortDirection, onSearchSend }) => {

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
            <table className="table">
                <thead>
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
                        </tr>
                    )
                    )
                    }
                </tbody>
            </table >
        </div>


    )
}

export default Table