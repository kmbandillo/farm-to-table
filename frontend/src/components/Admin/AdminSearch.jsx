import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-modal';
import ProductForm from './ProductForm';

Modal.setAppElement('#root'); // Set the root element for accessibility

function AdminSearch({ title, onSearch, onSortChange, setProducts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Pass the search query to the parent component
    };

    const handleSortCriteriaChange = (e) => {
        onSortChange(e.target.value, 'criteria');
    };

    const handleSortOrderChange = (e) => {
        onSortChange(e.target.value, 'order');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <div className='adminsearch-topcontainer flex items-center justify-between'>
            <div className='px-5 py-3 flex flex-1 justify-between'>
                <div className="bg-white w-fit p-2 rounded-lg border border-gray-400">
                    <input 
                        type="text" className="search-input w-[500px]" 
                        placeholder={title} 
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <button className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='addproductbtn-container'>
                        <button className='addproductbtn bg-[#5C8B57] p-2 rounded-lg text-white hover:bg-lime-700' onClick={openModal}> Add Product </button>
                    </div>
                    <div className='catalog-sortby'>
                        <select id="sortCriteria" onChange={handleSortCriteriaChange} className='sortcriteria-btn bg-[#FFFCEF] rounded-lg border border-gray-400 p-1'>
                            <option value="">Sort</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="quantity">Quantity</option>
                            <option value="type">Type</option>
                        </select>
                    </div>
                    <div className='catalog-orderby'>
                        <select id="sortOrder" onChange={handleSortOrderChange} className='sortorder-btn bg-[#FFFCEF] rounded-lg border border-gray-400 p-1'>
                            <option value="">Order</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Add Product"
            className="modal bg-white shadow-lg border border-gray-500 p-6 rounded-lg w-96"
                    overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <ProductForm closeModal={closeModal} setProducts={setProducts} />
        </Modal>
        </>
    );
}

export default AdminSearch;
