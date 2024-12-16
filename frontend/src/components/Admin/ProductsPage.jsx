import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility, should be the root element of your app

function ProductsPage({ initialProducts, onSearch }) {
    // state variables to manage products, modal, form values
    const [products, setProducts] = useState(initialProducts || []);
    const [filteredProducts, setFilteredProducts] = useState(initialProducts || []);
    const [editProduct, setEditProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        productImage: '',
        productName: '',
        productDescription: '',
        productType: '',
        productQuantity: '',
        productPrice: '',
    });

    // update state
    useEffect(() => {
        setProducts(initialProducts || []); // update products state when initialProducts prop changes
        setFilteredProducts(initialProducts || []); // update filteredProducts state similarly
    }, [initialProducts]);

    // handle search functionality to filter products by name
    const handleSearch = (searchQuery) => {
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        onSearch(searchQuery);
    };

    // handle product deletion
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            // remove deleted product from state
            setProducts(products.filter(product => product._id !== id));
            setFilteredProducts(filteredProducts.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // open model to edit a product
    const handleEdit = (product) => {
        setEditProduct(product._id);
        setFormValues({
            productImage: product.productImage,
            productName: product.productName,
            productDescription: product.productDescription,
            productType: product.productType,
            productQuantity: product.productQuantity,
            productPrice: product.productPrice,
        });
        setIsModalOpen(true); // Show the modal
    };

    // handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // handle product update on submit
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3002/products/${editProduct}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            // get updated product
            const updatedProduct = await response.json();
            // update products state with updated product
            setProducts(products.map(product =>
                product._id === editProduct ? updatedProduct.product : product
            ));
            setFilteredProducts(filteredProducts.map(product =>
                product._id === editProduct ? updatedProduct.product : product
            ));

            // clear form and close modal
            setEditProduct(null);
            setFormValues({
                productImage: '',
                productName: '',
                productDescription: '',
                productType: '',
                productQuantity: '',
                productPrice: '',
            });
            setIsModalOpen(false); // close modal
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // product types
    const productTypeOptions = [
        { value: 1, label: 'Crops' },
        { value: 2, label: 'Poultry' },
    ];

    // function to get product type label
    const getProductTypeLabel = (type) => {
        const option = productTypeOptions.find(option => option.value === parseInt(type));
        return option ? `${option.label} (${type})` : type;
    };

    // UI component
    return (
        <div>
            <div>
                <div className='p-5'>
                    {filteredProducts.map(product => (
                        <div key={product._id}>
                            <div className='w-full p-5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden mb-5 flex'>
                                <img src={product.productImage} alt={product.productName} className='w-[120px] h-[120px] object-contain mr-5' />
                                <div className='product-each-info flex items-center justify-between p-4 w-full'>
                                    <div className='name-price flex flex-col flex-1'>
                                        <p className='product-name font-extrabold'>{product.productName}</p>
                                        <p className='product-price text-lime-700 font-semibold'><i className="fas fa-peso-sign" />&nbsp;{product.productPrice}</p>
                                    </div>
                                    <div className='product-desc flex-1 text-center'>
                                        <p className='product-desc text-sm text-gray-600'>Description: {product.productDescription}</p>
                                    </div>
                                    <div className='type-qty flex flex-col items-center flex-1'>
                                        <p className='product-type'>{getProductTypeLabel(product.productType)}</p>
                                        <p className='product-quantity text-sm text-gray-700'>Qty: <b>{product.productQuantity}</b></p>
                                    </div>
                                    <div className='product-btns flex gap-4'>
                                        <button className='product-editbtn text-lime-800 hover:text-lime-500' onClick={() => handleEdit(product)}><i className="fas fa-pencil-alt" /></button>
                                        <button className='product-delbtn text-lime-800 hover:text-red-500' onClick={() => handleDelete(product._id)}><i className="fas fa-trash" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Edit Product"
                    className="modal bg-white shadow-lg border border-gray-500 p-6 rounded-lg w-96"
                    overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <h2 className='modal-title text-xl font-extrabold'>Edit Product</h2>
                    <div className='border border-gray-300 shadow-sm mb-2'></div>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div className='input-modal flex flex-col mb-2'>
                            <label className='edit-label text-sm'>Product Image</label>
                            <input
                                type="text"
                                name="productImage"
                                className='bg-green-100 p-1 px-2'
                                value={formValues.productImage}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal flex flex-col mb-2'>
                            <label className='edit-label text-sm'>Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                className='bg-green-100 p-1 px-2'
                                value={formValues.productName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal flex flex-col mb-2'>
                            <label className='edit-label text-sm'>Product Description</label>
                            <input
                                type="text"
                                name="productDescription"
                                className='bg-green-100 p-1 px-2'
                                value={formValues.productDescription}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal flex flex-col mb-2'>
                            <label className='edit-label text-sm'>Product Type</label>
                            <select
                                name="productType"
                                value={formValues.productType}
                                onChange={handleChange}
                                className='product-type-dropdown bg-green-100 p-1 px-2 rounded-md border border-gray-400'
                                required
                            >
                                {productTypeOptions.map(option => (
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
                                name="productQuantity"
                                className='bg-green-100 p-1 px-2'
                                value={formValues.productQuantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-modal flex flex-col mb-5'>
                            <label className='edit-label text-sm'>Product Price</label>
                            <input
                                type="number"
                                name="productPrice"
                                className='bg-green-100 p-1 px-2'
                                value={formValues.productPrice}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='modal-btns flex gap-3'>
                            <button type="submit" className='modal-update-btn bg-[#5C8B57] p-2 rounded-lg text-white hover:bg-lime-700'>Update</button>
                            <button type="button" className='modal-cancel-btn bg-red-900 p-2 rounded-lg text-white hover:bg-red-800' onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default ProductsPage;