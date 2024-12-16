import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import AdminSearchAcc from './AdminSearchAcc';
import Footer from '../Footer';

// AdminAccounts: component that displays and manages customer accounts
function AdminAccounts() {
    const [customers, setCustomers] = useState([]); // holds all customer data
    const [filteredCustomers, setFilteredCustomers] = useState([]); // filtered customer data

    // fetch customers data when component is mounted
    useEffect(() => {
        fetchCustomers();
    }, []);

    // function to fetch customers from the server
    function fetchCustomers() {
        fetch('http://localhost:3002/getcustomers') // API endpoint to get customer data
            .then(response => response.json()) // parse as JSON
            .then(body => {
                setCustomers(body); // update state will all customers
                setFilteredCustomers(body); // initialize filtered customers with all customers
            });
    }

    // function to handle search and filter customers (based on first name, middle, last, or email)
    const handleSearch = (searchQuery) => {
        const filtered = customers.filter(customer =>
            customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCustomers(filtered);
    };

    // UI component
    return (
        <>
        <div className='admin-accounts-container'> 
            <AdminTitle title="Manage Accounts" />

            <div className='adminaccs-top'>
                <AdminSearchAcc title="Search account" onSearch={handleSearch} />
                <p className='totalaccs'>Total Customer Accounts: <b>{filteredCustomers.length}</b></p>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Usertype</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan="4">No customers found</td>
                            </tr>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <tr key={customer._id}>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.middleName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.userType}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer />
        </>
    );
}
  
export default AdminAccounts;
