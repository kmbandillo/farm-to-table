import React, { useEffect, useState } from 'react';
import AdminTitle from '../Admin/AdminTitle';
import Footer from '../Footer';
import OrderCard from './OrderCard';

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
  
      const data = await response.json();
      if (data.success) {
        alert('Order cancelled successfully');
        fetchCustomerOrders(); // Refresh the list of orders
      } else {
        alert(data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const renderOrderCards = (orders) => {
    return orders.map(order => (
      <OrderCard key={order._id} order={order} cancelOrder={cancelOrder} />
    ));
  };

  return (
    <>
      <div className="customer-orders">
      <div className='bg-green-200'>
        <AdminTitle title="My Orders" />
      </div>
        <div className="customer-orders-container p-5">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-green-200 dark:border-neutral-300 dark:shadow-neutral-700/70">
            <div className="bg-white border-b rounded-t-xl pt-3 px-4 md:pt-4 md:px-5 dark:border-white">
              <nav className="flex gap-x-2">
                <a className={`-mb-px py-3 px-4 text-sm text-center font-bold border-b rounded-t-lg hover:text-gray-700 focus:outline-none focus:z-10 ${activeSection === 'pending' ? 'text-green-800 border-green-500 bg-green-200' : 'text-gray-500 dark:border-neutral-400 dark:hover:text-neutral-400'}`} onClick={() => setActiveSection('pending')}>Pending</a>
                <a className={`-mb-px py-3 px-4 text-sm text-center font-bold border-b rounded-t-lg hover:text-gray-700 focus:outline-none focus:z-10 ${activeSection === 'confirmed' ? 'text-green-800 border-green-500 bg-green-200' : 'text-gray-500 dark:border-neutral-400 dark:hover:text-neutral-400'}`} onClick={() => setActiveSection('confirmed')}>Confirmed</a>
                <a className={`-mb-px py-3 px-4 text-sm text-center font-bold border-b rounded-t-lg hover:text-gray-700 focus:outline-none focus:z-10 ${activeSection === 'cancelled' ? 'text-green-800 border-green-500 bg-green-200' : 'text-gray-500 dark:border-neutral-400 dark:hover:text-neutral-400'}`} onClick={() => setActiveSection('cancelled')}>Cancelled</a>
              </nav>
            </div>

            <div className="p-4 text-center md:py-7 md:px-8">
              {activeSection === 'pending' && (
                <div>
                  {pendingOrders.length === 0 ? (
                    <p className="customer-no-orders">No Pending Orders.</p>
                  ) : (
                    <div className="orders-list py-4">
                      {renderOrderCards(pendingOrders)}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'confirmed' && (
                <div>
                  {confirmedOrders.length === 0 ? (
                    <p className="customer-no-orders">No Confirmed Orders.</p>
                  ) : (
                    <div className="orders-list py-4">
                      {renderOrderCards(confirmedOrders)}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'cancelled' && (
                <div>
                  {canceledOrders.length === 0 ? (
                    <p className="customer-no-orders">No Cancelled Orders.</p>
                  ) : (
                    <div className="orders-list py-4">
                      {renderOrderCards(canceledOrders)}
                    </div>
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
