import React from 'react';

export const Pagination: React.FC<{ roomsPerPage: number; totalRooms: number; currentPage: number; paginate: any }> = (
    props,
) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(props.totalRooms / props.roomsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <div className="pagination-nav">
            <ul className="pagination-ul">
                {pageNumbers.map((number) => (
                    <li key={number} className="pagination-li">
                        <button
                            onClick={() => props.paginate(number)}
                            className={`pagination-button ${props.currentPage === number ? 'current-page' : ''}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
