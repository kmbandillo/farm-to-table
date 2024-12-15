import React, { useEffect, useState } from 'react';
import AdminTitle from '../Admin/AdminTitle';
import Footer from '../Footer';

function CustomerOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [activeSection, setActiveSection] = useState('pending'); // Default to 'pending'

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  const fetchCustomerOrders = async () => {
    try {
      const userId = localStorage.getItem('user');
      const response = await fetch(`http://localhost:3002/customer-orders/${userId}`);
      const data = await response.json();
      setPendingOrders(data.pendingOrders);
      setConfirmedOrders(data.confirmedOrders);
      setCanceledOrders(data.canceledOrders);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3002/cancel-order/${orderId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        alert('Order cancelled successfully');
        fetchCustomerOrders();
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  function getStatusText(status) {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Confirmed";
      case 2:
        return "Cancelled";
      default:
        return "Unknown";
    }
  }

  return (
    <>
      <div className="customer-orders">
        <AdminTitle title="My Orders" />
        <div className="customer-orders-container">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="bg-gray-100 border-b rounded-t-xl pt-3 px-4 md:pt-4 md:px-5 dark:bg-neutral-800 dark:border-neutral-700">
              <nav className="flex gap-x-2">
                <a
                  className={`-mb-px py-3 px-4 bg-white text-sm font-medium text-center border border-b-transparent text-gray-500 rounded-t-lg hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:z-10 dark:bg-neutral-900 dark:border-neutral-700 dark:border-b-gray-800 dark:hover:text-neutral-400 dark:focus:text-neutral-400 ${activeSection === 'pending' ? 'text-blue-500' : ''}`}
                  onClick={() => setActiveSection('pending')}
                >
                  Pending
                </a>
                <a
                  className={`-mb-px py-3 px-4 text-sm font-medium text-center border-b text-gray-500 rounded-t-lg hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:z-10 dark:border-neutral-700 dark:hover:text-neutral-400 dark:focus:text-neutral-400 ${activeSection === 'confirmed' ? 'text-blue-500' : ''}`}
                  onClick={() => setActiveSection('confirmed')}
                >
                  Confirmed
                </a>
                <a
                  className={`-mb-px py-3 px-4 text-sm font-medium text-center border-b text-gray-500 rounded-t-lg hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:z-10 dark:border-neutral-700 dark:hover:text-neutral-400 dark:focus:text-neutral-400 ${activeSection === 'cancelled' ? 'text-blue-500' : ''}`}
                  onClick={() => setActiveSection('cancelled')}
                >
                  Cancelled
                </a>
              </nav>
            </div>

            <div className="p-4 text-center md:py-7 md:px-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Orders
              </h3>
              {activeSection === 'pending' && (
                <div>
                  {pendingOrders.length === 0 ? (
                    <p className="customer-no-orders">No Pending Orders.</p>
                  ) : (
                    pendingOrders.map(order => (
                      <div key={order._id} className="border rounded-xl shadow-sm p-6 dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="customer-order-header">
                          <h3>Order ID: {order._id}</h3>
                        </div>
                        <div className="customer-order-details">
                          <div className="customer-order-products">
                            <p><strong>Products:</strong></p>
                            <div className="customer-order-product-list">
                              {order.products.map((product, index) => (
                                <div key={index} className="customer-product-item">
                                  <p><strong>Name:</strong> {product.productId?.productName}</p>
                                  <p><strong>Quantity:</strong> {product.quantity}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p><strong>Status:</strong> {getStatusText(order.status)}</p>
                          {order.status === 0 && (
                            <div className="cancel-order-button-container">
                              <button className="cancel-order-button" onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeSection === 'confirmed' && (
                <div>
                  {confirmedOrders.length === 0 ? (
                    <p className="customer-no-orders">No Confirmed Orders.</p>
                  ) : (
                    confirmedOrders.map(order => (
                      <div key={order._id} className="border rounded-xl shadow-sm p-6 dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="customer-order-header">
                          <h3>Order ID: {order._id}</h3>
                        </div>
                        <div className="customer-order-details">
                          <div className="customer-order-products">
                            <p><strong>Products:</strong></p>
                            <div className="customer-order-product-list">
                              {order.products.map((product, index) => (
                                <div key={index} className="customer-product-item">
                                  <p><strong>Name:</strong> {product.productId?.productName}</p>
                                  <p><strong>Quantity:</strong> {product.quantity}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p><strong>Status:</strong> {getStatusText(order.status)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeSection === 'cancelled' && (
                <div>
                  {canceledOrders.length === 0 ? (
                    <p className="customer-no-orders">No Cancelled Orders.</p>
                  ) : (
                    canceledOrders.map(order => (
                      <div key={order._id} className="border rounded-xl shadow-sm p-6 dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="customer-order-header">
                          <h3>Order ID: {order._id}</h3>
                        </div>
                        <div className="customer-order-details">
                          <div className="customer-order-products">
                            <p><strong>Products:</strong></p>
                            <div className="customer-order-product-list">
                              {order.products.map((product, index) => (
                                <div key={index} className="customer-product-item">
                                  <p><strong>Name:</strong> {product.productId?.productName}</p>
                                  <p><strong>Quantity:</strong> {product.quantity}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p><strong>Status:</strong> {getStatusText(order.status)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerOrders;