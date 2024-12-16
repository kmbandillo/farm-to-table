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
                <p className='w-60 ml-[15.5%] bg-white bg-opacity-80 rounded-lg shadow-xl text-base mt-[32px] text-[#31454D] text-center'>Total Customer Accounts: <strong>{filteredCustomers.length}</strong></p>
            </div>
            <div className="overflow-auto bg-[#94B690] max-h-[500px] bg-opacity-85 rounded-lg shadow-xl mt-10 p-10">
            <ul className='list-none'>
                        {filteredCustomers.length === 0 ? (
                            <li className = "text-center p-5 text-lg text-black">No customers found </li>
                        ) : (
                            filteredCustomers.map((customer) => (
                                <li key={customer._id} className = 'bg-white border-white rounded-lg p-5 my-6 shadow-xl transition-all duration-200 ease-in-out hover:shadow-2xl hover:-translate-y-1'>
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
        <Footer />
        </>
    );
}
  
export default AdminAccounts;
