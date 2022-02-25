import React from "react";

const Pagination = ({ paginationRow, currentPage, onNextPress, onPrevPress, buttonActive, currentPageNumber }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous" onClick={() => { onPrevPress() }} >

                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {paginationRow.map(p => {
                    return (
                        <li className={(currentPageNumber === p) ? `page-item ${buttonActive}` : `page-item`} key={p}>
                            <a className="page-link" href="#" onClick={() => { currentPage(p) }}>{p}</a>
                        </li>
                    )
                })}
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next" onClick={() => { onNextPress() }}>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination

