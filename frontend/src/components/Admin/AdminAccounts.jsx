import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import AdminSearchAcc from './AdminSearchAcc';
import Footer from '../Footer';
import backgroundImage from '../../assets/adminbg.png';
import '../../stylesheet.css'

function AdminAccounts() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    function fetchCustomers() {
        fetch('http://localhost:3002/getcustomers')
            .then(response => response.json())
            .then(body => {
                setCustomers(body);
                setFilteredCustomers(body); // Initialize filtered customers with all customers
            });
    }

    const handleSearch = (searchQuery) => {
        const filtered = customers.filter(customer =>
            customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCustomers(filtered);
    };

    return (
        <>
        <div className='admin-accounts-container'> 
            <AdminTitle title="Manage Accounts" />
            <div className='adminaccs-top'>
                <AdminSearchAcc title="Search account" onSearch={handleSearch} />
                <p className='totalaccs'>Total Customer Accounts: <strong>{filteredCustomers.length}</strong></p>
            </div>
            <ul className='account-container'>
                        {filteredCustomers.length === 0 ? (
                            <li className = "no-customers">No customers found </li>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <li key={customer._id} className = 'customer-accounts'>
                                    <p><strong>First Name:</strong> {customer.firstName}</p>
                                    <p><strong>Middle Name:</strong> {customer.middleName}</p>
                                    <p><strong>Last Name:</strong> {customer.lastName}</p>
                                    <p><strong>Email:</strong> {customer.email}</p>
                                    <p><strong>User type:</strong> {customer.userType}</p>
                                </li>
                            ))
                        )}
            </ul>
        </div>
        <Footer />
        </>
    );
}
  
export default AdminAccounts;
