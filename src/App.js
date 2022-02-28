import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './music_table/table';
import Pagination from './pagination/pagination';



function App() {

    const baseUrl = 'https://davidpots.com/jakeworry/017%20JSON%20Grouping,%20part%203/data.json';

    const [tableData, setTableData] = useState([]);
    const [sortDirection, setSortDirection] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [buttonActive, setButtonActive] = useState('page-item');
    const [artistFilter, setArtistFilter] = useState('');

    const [searchText, setSearchText] = useState('');
    const countItems = 8;

    const getFiltredByArtist = () => {
        return tableData.filter(el => {
            return el['artist'].includes(artistFilter)
        })
    }
    const filtredData = getFiltredByArtist();

    const getSearchedData = () => {
        if (!searchText) {
            return filtredData
        }
        return filtredData.filter(el => {
            return el['title'].toLowerCase().includes(searchText.toLowerCase()) || el['artist'].toLowerCase().includes(searchText.toLowerCase()) || el['year'].toLowerCase().includes(searchText.toLowerCase())
        })
    }
    const searchedData = getSearchedData();

    const lastString = currentPageNumber * countItems;
    const firstString = lastString - countItems;
    const currentString = searchedData.slice(firstString, lastString);



    const currentPage = (p) => {
        setCurrentPageNumber(p)
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
        axios(baseUrl)
            .then((res) => {
                setTableData(res.data.songs)
                setTotalRows(searchedData.length);
                const getTotalPages = totalRows / countItems;
                setTotalPages(getTotalPages);
                currentPage(1)
            })
    }, [setTotalRows, setTotalPages, searchedData.length, totalRows])

    let paginationRow = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationRow.push(i)
    };

    const onSearchSend = (value) => {
        setSearchText(value)
    }


    const byArtistFilter = (val) => {
        console.log(val);
        setArtistFilter(val)
    }
    const sortTable = (key) => {
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
            <Table currentString={currentString} sortTable={sortTable} sortDirection={sortDirection} byArtistFilter={byArtistFilter} tableData={tableData} onSearchSend={onSearchSend} />
            <Pagination paginationRow={paginationRow} currentPage={currentPage} onNextPress={onNextPress} onPrevPress={onPrevPress} buttonActive={buttonActive} currentPageNumber={currentPageNumber} />
        </div >
    );
}

export default App;
