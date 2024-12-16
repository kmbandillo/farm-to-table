import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AdminSearchAcc({ title, onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    // function to handle changes in the search input field
    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // pass the search query to the parent component
    };

    return (
        <div className='adminsearch-topcontainer flex items-center justify-between'>
            <div className='py-3 flex flex-1 w-justify-between'>
                <div className="bg-white w-[376px] p-2 rounded-lg border border-gray-400">
                    <input
                        type="text" 
                        className="search-input  justify-start pr-32" 
                        placeholder={title} 
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <button className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminSearchAcc;
