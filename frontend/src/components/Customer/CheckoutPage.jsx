import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminTitle from '../Admin/AdminTitle';
import Footer from '../Footer'

function CheckoutPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user");
  const email = localStorage.getItem("email"); // Assuming email is also stored in localStorage
  console.log('User ID from localStorage:', userId);
  console.log('Email from localStorage:', email); // Log email to ensure it's being retrieved

  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Cart:', cart);
    console.log('Email:', email);
  }, [location.state]);

  const totalPrice = cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);

  function FieldGetterChecker() {
    const currentStatus = 0;
    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(' ')[0];

    const products = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    addTransaction(products, currentStatus, currentDate, currentTime, userId, email);
    localStorage.removeItem('cart');
  }

  const addTransaction = async (products, currentStatus, currentDate, currentTime, userId, email) => {
    console.log('Sending data:', { products, status: currentStatus, date: currentDate, time: currentTime, userId, email }); // Log data being sent
    await fetch("http://localhost:3002/add-transaction", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products, status: currentStatus, date: currentDate, time: currentTime, userId, email })
    })
    .then(response => response.json())
    .then(body => {
      if (body.success) {
        alert("Successfully Requested");
        navigate('/customer/orders');
      } else {
        alert("Request Failed");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className='checkout-whole'>
      <div className='bg-green-200'>
        <AdminTitle title="Order Confirmation" />
      </div>
      <div className='checkout-page-container'>
        <div className="px-8 pt-8">
          {cart.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            cart.map(item => (
              <div key={item._id} className="flex bg-white outline outline-1 outline-gray-200 mb-5 p-5 rounded-lg shadow-lg">
                <div className='flex items-center justify-between p-4 w-full'>
                  <div className='mr-10'>
                    <img src={item.productImage} alt={item.productName} width="100" height="50" className='checkout-image'/>
                  </div>
                  <div className='flex flex-col flex-1 text-left'>
                    <h3 className='text-xl font-bold'>{item.productName}</h3>
                    <p className='text-sm'>Quantity: <b>{item.quantity}</b></p>
                  </div>
                  <div className='flex flex-col flex-1 text-right'>
                    <p className='text-gray-500 text-sm'>Price: <i className="fas fa-peso-sign" /> <b>{item.productPrice}</b></p>
                    <p>Total: <i className="fas fa-peso-sign" /> <b>{item.productPrice * item.quantity}</b></p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='flex px-10 justify-between pb-10'>
          <div className='text-lg'>
            <p className='mot'><b className='text-green-700 text-sm'>Payment Method:</b> COD</p>
            {cart.length > 0 && (
              <div className="checkout-total">
                <h3><b className='text-green-700 text-sm'>Total Payment:</b> <i className="fas fa-peso-sign" /> {totalPrice.toFixed(2)}</h3>
              </div>
            )}
          </div>
          <div className='confirm-order-button-container'>
            <button id='confirm-order-button' className='px-8 py-2 text-white bg-[#75B27C] hover:bg-[#659a6b] rounded-lg w-[100%] shadow-md transition' onClick={FieldGetterChecker}>Confirm order</button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CheckoutPage;
