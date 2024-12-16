import React, { useEffect, useState } from 'react';
import AdminTitle from './AdminTitle';
import Footer from '../Footer';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('http://localhost:3002/pending-transactions');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const confirmOrder = async (transactionId) => {
    try {
      const response = await fetch('http://localhost:3002/update-transaction-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactionId, status: 1 })
      });
      const result = await response.json();

      if (result.success) {
        alert('Order confirmed successfully');
        fetchPendingOrders(); // Refresh the orders list
      } else {
        alert('Failed to confirm order');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const cancelOrder = async (transactionId) => {
    try {
      const response = await fetch('http://localhost:3002/cancel-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactionId })
      });
      const result = await response.json();

      if (result.success) {
        alert('Order cancelled successfully');
        fetchPendingOrders(); // Refresh the orders list
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

    function getStatusText(status) {
        switch(status) {
            case 0:
                return "Pending";
            case 1:
                return "Complete";
            case 2:
                return "Canceled";
            default:
                return "Unknown";
        }
    }

    return (
    <div>
      <div className='p-5'>
        <AdminTitle title="Manage Order Requests" />
        <div className='my-5'>
          <div className='bg-green-200 p-8'>
              {orders.length === 0 ? (
                  <p className="text-center">No pending orders.</p>
              ) : (
                  orders.map(order => (
                  <div key={order._id} className="bg-white border border-gray-300 p-5 rounded-lg shadow-2xl">
                      <div className="order-header1">
                      <h3 className='text-xl'><strong>Order ID:</strong> {order._id}</h3>
                      </div>
                      <div className="order-details1 text-sm flex justify-evenly">
                          <div className='p-2 w-full'>
                            <p><strong>Email:</strong> {order.userId?.email}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {order.time}</p>
                          </div>
                          <div className="p-2 w-full">
                              <p><strong>Products:</strong></p>
                              <div className="product-list1 flex-col flex gap-3 overflow-y-scroll h-[30px]">
                              {order.products.map((product, index) => (
                                  <div key={index} className="product-item1 text-xs">
                                  <p><strong>Name:</strong> {product.productId?.productName}</p>
                                  <p><strong>Quantity:</strong> {product.quantity}</p>
                                  </div>
                              ))}
                              </div>
                          </div>
                          <div className='py-3 w-full text-center m-auto'><p className='text-md'><strong>Order Status:</strong> {getStatusText(order.status)}</p></div>
                          <div className='w-full text-right my-auto'>
                            <div className="order-actions1">
                              <button className="cancel-button1 bg-red-900 p-2 rounded-lg text-white hover:bg-red-800 mr-1" onClick={() => cancelOrder(order._id)}>Decline</button>
                              <button className="confirm-button1 bg-[#5C8B57] p-2 rounded-lg text-white hover:bg-lime-700" onClick={() => confirmOrder(order._id)}>Approve</button>
                            </div>
                          </div>
                      </div>
                  </div>
                  ))
              )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminOrders;
