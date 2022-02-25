import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './music_table/table';
import Pagination from './pagination/pagination';


// import * as musicDataset from './music.json';


function App() {

    const baseUrl = 'http://davidpots.com/jakeworry/017%20JSON%20Grouping,%20part%203/data.json';

    const [tableData, setTableData] = useState([]);
    const [sortDirection, setSortDirection] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [buttonActive, setButtonActive] = useState('page-item');
    const [searchText, setSearchText] = useState('');

    const countItems = 8;

    const getFiltredData = () => {
        if (!searchText) {
            return tableData
        }
        return tableData.filter(el => {
            return el['title'].toLowerCase().includes(searchText.toLowerCase())
        })
    }
    const filtredData = getFiltredData();

    const lastString = currentPageNumber * countItems;
    const firstString = lastString - countItems;
    const currentString = filtredData.slice(firstString, lastString);





    const currentPage = (pg) => {
        setCurrentPageNumber(pg)
        setButtonActive('active')
    }

    const onNextPress = () => {
        if (currentPageNumber > totalPages - 1) {
            setCurrentPageNumber(1)
        } else {
            setCurrentPageNumber(currentPageNumber + 1)
        }

    }

    const onPrevPress = () => {
        if (currentPageNumber < 2) {
            setCurrentPageNumber(totalPages)
        } else {
            setCurrentPageNumber(currentPageNumber - 1)
        }

    }



    useEffect(() => {
        axios.get(baseUrl)
            .then((res) => {
                setTableData(res.data.songs)
                setTotalRows(filtredData.length);
                const getTotalPages = totalRows / countItems;
                setTotalPages(getTotalPages);

            })
    }, [setTotalRows, setTotalPages, filtredData.length, totalRows])

    let paginationRow = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationRow.push(i)
    };

    const onSearchSend = (value) => {
        setSearchText(value)
    }
    const sortTable = (key) => {
        // console.log(key);
        const copyTable = tableData.concat();
        let sortedTable;
        if (sortDirection) {
            sortedTable = copyTable
                .sort((a, b) => { return a[key] > b[key] ? 1 : -1 })
        } sortedTable = copyTable
            .reverse((a, b) => { return a[key] > b[key] ? 1 : -1 })
        setTableData(sortedTable);
        setSortDirection(!sortDirection)
    }

    return (
        <div className="container">
            <Table currentString={currentString} sortTable={sortTable} sortDirection={sortDirection} onSearchSend={onSearchSend} />
            <Pagination paginationRow={paginationRow} currentPage={currentPage} onNextPress={onNextPress} onPrevPress={onPrevPress} buttonActive={buttonActive} currentPageNumber={currentPageNumber} />

        </div >
    );
}

export default App;
