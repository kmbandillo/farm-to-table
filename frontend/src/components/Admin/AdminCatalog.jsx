import React, { useState, useEffect } from 'react';
import ProductForm from "./ProductForm";
import ProductsPage from "./ProductsPage";
import AdminTitle from "./AdminTitle";
import AdminSearch from "./AdminSearch";
import Footer from '../Footer';

// AdminCatalog: component that displays and manages product catalog
function AdminCatalog() {
    const [products, setProducts] = useState([]); // holds list of products
    const [isDescending, setIsDescending] = useState(false); // for sorting order (ascending/descending)
    const [sortCriteria, setSortCriteria] = useState(''); // sort criteria (name, price, type, quantity)

    // fetch products data when component is mounted
    useEffect(() => {
        fetchProducts();
    }, [isDescending, sortCriteria]);

    // function to fetch products from the server
    function fetchProducts() {
        fetch('http://localhost:3002/getproducts') // API endpoint to get all products
            .then(response => response.json()) // parse as JSON
            .then(body => {
                sortProducts(body); // sort products based on current sorting criteria
                setProducts(body); // update product state
            });
    }

    // function to sort products based on criteria or order
    function sortProducts(list) {
        if (sortCriteria === 'name') { // sort by name
            list.sort((a, b) => a.productName.localeCompare(b.productName));
        } else if (sortCriteria === 'price') { // sort by price
            list.sort((a, b) => a.productPrice - b.productPrice);
        } else if (sortCriteria === 'quantity') { // sort by quantity
            list.sort((a, b) => a.productQuantity - b.productQuantity);
        } else if (sortCriteria === 'type') { // sort by type
            list.sort((a, b) => a.productType - b.productType);
        }
        if (isDescending) {
            list.reverse(); // reverse the list if descending order is selected
        }
    }

    // function to handle search; fetches products that match what is searched from the server
    const handleSearch = async (searchQuery) => {
        try {
            const response = await fetch(`http://localhost:3002/search?query=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to search products');
            }
            const data = await response.json(); // parse search result
            setProducts(data); // update products state with search results
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    // function to handle sorting; updates the sorting criteria or order state
    const handleSortChange = (value, type) => {
        if (type === 'criteria') {
            setSortCriteria(value);
        } else if (type === 'order') {
            setIsDescending(value === 'desc');
        }
    };

    // UI component
    return (
        <div className="admincatalog-container">
            <div className='bg-green-100 m-5'>
                <AdminTitle title="Manage Catalog" />
            </div>
            {/* <ProductForm /> */}
            <div className='bg-green-200 m-5 p-5'>
                <AdminSearch title="Search product name" onSearch={handleSearch} onSortChange={handleSortChange} setProducts={setProducts} />
                <ProductsPage initialProducts={products} onSearch={handleSearch} />
            </div>
            
            <Footer />
        </div>
    );
}

export default AdminCatalog;
