import image from '../../assets/indicator.png';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../Footer';

function AdminHome() {
  const [confirmedTotalPrice, setConfirmedTotalPrice] = useState(0);
  const [pendingTotalPrice, setPendingTotalPrice] = useState(0);
  const [totals, setTotals] = useState({ confirmedCount: 0, pendingCount: 0 });
  const today = new Date();
  const pending_orders = 3;
  // Format the day of the week in English
  const dayOptions = { weekday: 'long' };
  const day = today.toLocaleDateString('en-US', dayOptions);

  // Format the rest of the date in Filipino
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchTotals();
    fetchTotalPrices();
  }, []);

  function fetchCustomers() {
    fetch('http://localhost:3002/getcustomers')
      .then(response => response.json())
      .then(body => {
          setCustomers(body);
      });
  }

  function fetchTotals() {
    fetch('http://localhost:3002/total-counts')
      .then(response => response.json())
      .then(body => {
        setTotals(body);
      })
      .catch(error => {
        console.error('Error fetching totals:', error);
      });
  }

  const fetchTotalPrices = async () => {
    try {
      const response = await fetch('http://localhost:3002/total-prices');
      const data = await response.json();
      setConfirmedTotalPrice(data.confirmedTotal);
      setPendingTotalPrice(data.pendingTotal);
    } catch (error) {
      console.error('Error fetching total prices:', error);
    }
  };

  return (
    <>
    <div className='adminhome-container'>
    <div
        className="bg-cover bg-center bg-no-repeat h-screen"
        style={{
          backgroundImage: `url(${'https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg'})`,
        }}
      >
      <div className='m-auto justify-center'>
        <div className="shadow-2xl text-black bg-white/50 backdrop-blur-sm p-5 mb-5 w-full h-[300px] text-center">
          <p class='mt-40 text-2xl'>Hello, <b>Admin!</b></p>
          <p>Today is {day}, {formattedDate}.</p>
          <p>You have <b>{totals.pendingCount}</b> pending order requests.</p>
        </div>
        <div className='flex justify-evenly mt-20'>
          <div className="bg-lime-100 p-5 w-[30%] rounded-lg shadow-2xl">
            <p className='font-extrabold'>ORDER REQUESTS</p>
            <div className="flex justify-evenly">
              <div>
                <h3 className='text-2xl font-semibold text-center'>{totals.confirmedCount}</h3>
                <p className='admin-label' >Total Requests</p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold text-center'>{totals.pendingCount}</h3>
                <p className='admin-label'>Pending Requests</p>
              </div>
            </div>
          </div>
          <div className='bg-lime-100 p-5 w-[20%] rounded-lg shadow-2xl'>
            <p className='font-extrabold'>ACCOUNTS</p>
            <div className='adminhome-each-in2'>
              <h3 className='text-2xl font-semibold text-center'>{customers.length}</h3>
              <p className='text-center'>Total Accounts</p>
            </div>
          </div>
          <div className="bg-lime-100 p-5 w-[30%] rounded-lg shadow-2xl">
            <p className='font-extrabold'>BALANCES</p>
            <div className="flex justify-evenly">
              <div>
                <h3 className='text-2xl font-semibold text-center'><i className="fas fa-peso-sign" />{confirmedTotalPrice}</h3>
                <p className='admin-label'>Confirmed</p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold text-center'><i className="fas fa-peso-sign" />{pendingTotalPrice}</h3>
                <p className='admin-label'>Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div> 
    <Footer />
    </>
  );
}
  
export default AdminHome;
  