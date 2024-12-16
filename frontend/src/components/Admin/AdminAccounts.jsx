import React, { useState, useEffect } from 'react';
import AdminTitle from './AdminTitle';
import AdminSearchAcc from './AdminSearchAcc';
import Footer from '../Footer';
import backgroundImage from '../../assets/adminbg.png';

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
        {/* <div className='relative z-10 bg-none max-w-screen-x1 mx-auto p-20 items-center min-h-screen overflow-auto'>  */}
        <div
       
      >
        <div className='my-5'>
            <div className='m-5'>
                 <AdminTitle title="Manage Accounts" />
            </div>
            <div className="bg-green-200 mx-5 py-5 px-10">
            <div className='flex flex-row justify-between'>
            <AdminSearchAcc title="Search account" onSearch={handleSearch} />
            <div className='flex'>
                <p className='h-10 mt-3 bg-white rounded-lg text-base p-2 text-[#31454D] text-center'>Total Customer Accounts: <strong>{filteredCustomers.length}</strong></p>
            </div>
            </div>
            
            <ul className='list-none'>
                        {filteredCustomers.length === 0 ? (
                            <li className = "text-center p-5 text-lg text-black">No customers found </li>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <li key={customer._id} className = 'bg-white border-white rounded-xl p-5 my-6 shadow-xl transition-all duration-200 ease-in-out'>
                                    <p className="my-2 text-sm"><strong className="font-bold">First Name:</strong> {customer.firstName}</p>
                                    <p className="my-2 text-sm"><strong className="font-bold">Middle Name:</strong> {customer.middleName}</p>
                                    <p className="my-2 text-sm"><strong className="font-bold">Last Name:</strong> {customer.lastName}</p>
                                    <p className="my-2 text-sm"><strong className="font-bold">Email:</strong> {customer.email}</p>
                                    <p className="my-2 text-sm"><strong className="font-bold">User type:</strong> {customer.userType}</p>
                                </li>
                            ))
                        )}
            </ul>
            </div>
        </div>
        </div>
        {/* </div> */}
        <Footer />
        </>
    );
}
  
export default AdminAccounts;