import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const productTypeOptions = [
    { value: 1, label: 'Crops' },
    { value: 2, label: 'Poultry' },
];

function ProductForm({ closeModal, setProducts }) {
    // local state variables to store product data
    const [productImage, setProductImage] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState(productTypeOptions[0].value); // Default to the first option
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const navigate = useNavigate();

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission
        try { // add new product
            const response = await fetch('http://localhost:3002/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productImage, productName, productDescription, productType, productQuantity, productPrice }),
            });
            const data = await response.json();

            // if product is added succesfully, update products list and close modal
            if (data.success) {
                setProducts((prevProducts) => [...prevProducts, data.product]); // add the new product to the list
                closeModal(); // close the modal
                navigate('/admin/catalog'); // navigate to the catalog page
            } else {
                alert('Error: Unable to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error: Unable to add product');
        }
    };

    // UI component
    return (
        <div>
            <h2 className='modal-title text-xl font-extrabold'>Add Product</h2>
            <div className='border border-gray-300 shadow-sm mb-2'></div>
            <form onSubmit={handleSubmit}>
                <div className='input-modal flex flex-col mb-2'>
                    <label className='edit-label text-sm'>Product Image</label>
                    <input
                        type="text"
                        placeholder='Image Link'
                        value={productImage}
                        className='bg-green-100 p-1 px-2'
                        onChange={(e) => setProductImage(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal flex flex-col mb-2'>
                    <label className='edit-label text-sm'>Product Name</label>
                    <input
                        type="text"
                        placeholder='Name'
                        value={productName}
                        className='bg-green-100 p-1 px-2'
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal flex flex-col mb-2'>
                    <label className='edit-label text-sm'>Product Description</label>
                    <input
                        type="text"
                        placeholder='Description'
                        value={productDescription}
                        className='bg-green-100 p-1 px-2'
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal flex flex-col mb-2'>
                    <label className='edit-label text-sm'>Product Type</label>
                    <select className='product-type-dropdown bg-green-100 p-1 px-2 rounded-md border border-gray-400'
                        value={productType}
                        onChange={(e) => setProductType(Number(e.target.value))} // Convert the selected value to a number
                        required
                    >
                        {productTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-modal flex flex-col mb-2'>
                    <label className='edit-label text-sm'>Product Quantity</label>
                    <input
                        type="number"
                        placeholder='0'
                        value={productQuantity}
                        className='bg-green-100 p-1 px-2'
                        onChange={(e) => setProductQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className='input-modal flex flex-col mb-5'>
                    <label className='edit-label text-sm'>Product Price</label>
                    <input
                        type="number"
                        placeholder='0'
                        value={productPrice}
                        className='bg-green-100 p-1 px-2'
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className='modal-btns flex gap-3'>
                <button type="submit" className='modal-update-btn bg-[#5C8B57] p-2 rounded-lg text-white hover:bg-lime-700'>Add</button>
                    <button type="button" className='modal-cancel-btn bg-red-900 p-2 rounded-lg text-white hover:bg-red-800' onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;