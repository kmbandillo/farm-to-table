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
        <div className='relative z-10 bg-none max-w-screen-x1 mx-auto p-20 items-center min-h-screen overflow-auto'> 
        <div
        className="bg-cover bg-center bg-no-repeat h-full brightness-75 absolute top-0 left-0 w-full z-0"
        style={{
          backgroundImage: `url(${'https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg'})`,
        }}
      >
            <AdminTitle title="Manage Accounts" />
            <div className='flex flex-row ml-[5.2%] mt-[1.1%]'>
                <AdminSearchAcc title="Search account" onSearch={handleSearch} />
                <p className='totalaccs'>Total Customer Accounts: <strong>{filteredCustomers.length}</strong></p>
            </div>
            <div className="overflow-auto max-h-[450px] bg-[rgba(146, 197, 136, 0.8)] rounded-lg shadow-lg mt-5 p-5">
            <ul className='list-none p-0 m-0'>
                        {filteredCustomers.length === 0 ? (
                            <li className = "text-center p-5 text-lg text-gray-600">No customers found </li>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <li key={customer._id} className = 'bg-white rounded-lg p-5 my-6 shadow-lg transition-all duration-200 ease-in-out hover:shadow-2xl hover:-translate-y-1'>
                                    <p class="my-2 text-sm"><strong class="font-bold">First Name:</strong> {customer.firstName}</p>
                                    <p class="my-2 text-sm"><strong class="font-bold">Middle Name:</strong> {customer.middleName}</p>
                                    <p class="my-2 text-sm"><strong class="font-bold">Last Name:</strong> {customer.lastName}</p>
                                    <p class="my-2 text-sm"><strong class="font-bold">Email:</strong> {customer.email}</p>
                                    <p class="my-2 text-sm"><strong class="font-bold">User type:</strong> {customer.userType}</p>
                                </li>
                            ))
                        )}
            </ul>
            </div>
        </div>

        </div>
        <Footer />
        </>
    );
}
  
export default AdminAccounts;
