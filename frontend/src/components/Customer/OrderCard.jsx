import React, { useState } from 'react';

function OrderCard({ order, cancelOrder }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open/close modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div key={order._id} className="border flex rounded-xl shadow-md p-4 mb-2 dark:bg-white dark:border-neutral-400">
      {/* Left Section: Order ID */}
      <div className="flex flex-col justify-between w-1/4 ml-5">
        <div className="customer-order-header">
          <h3 className="my-8 text-lg"><b>Order ID:</b> {order._id}</h3>
        </div>
      </div>

      {/* Middle Section: Product Details with View Details Button */}
      <div className="flex-1 ml-6 mt-5">
        <div className="customer-order-products mb-4">
          <p><strong>Products:</strong></p>
          {/* Button to view details */}
          <button
            onClick={toggleModal}
            className="view-details-button text-blue-500 underline mb-4"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Right Section: Cancel Order Button */}
      <div className="flex items-center justify-center w-1/4">
        {order.status === 0 && (
          <button 
            className="cancel-order-button bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => cancelOrder(order._id)} // Use the passed cancelOrder function
          >
            Cancel Order
          </button>
        )}
      </div>

      {/* Modal for Order Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 py-10 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl mb-4 font-bold">Order Details</h2>
            <div className="customer-order-product-list">
              <div className='text-left mx-6'>
                <p className='text-sm'><b>Order ID: </b>{order._id}</p>
                <p className='text-sm'><b>Date: </b>{order.date}</p>
                <p className='text-sm'><b>Time: </b>{order.time}</p>
              </div>
              <div className="h-0.5 w-[90%] bg-gray-300 mx-auto m-4"></div>
              {/* Loop through each product and display its name and quantity */}
              {order.products.map((product, index) => (
                <div key={index} className="customer-product-item flex flex-row justify-between mx-10 mb-2">
                  <p>{product.productId?.productName}</p>
                  <p><i className="fas fa-peso-sign" /> {product.productId?.productPrice}</p>
                  <p>x{product.quantity}</p>
                </div>
              ))}
            </div>

            {/* Calculate the total (assuming each product has a price) */}
            <div className="mt-4">
              <div className="h-0.5 w-[90%] bg-gray-300 mx-auto m-4"></div>
              <div className='flex justify-between px-10'>
                <p className="font-semibold text-xl">
                <b>Total:</b>
                </p>
                <p className='text-lg font-bold text-green-900'><i className="fas fa-peso-sign" />{
                    order.products.reduce((total, product) => total + (product.productId?.productPrice || 0) * product.quantity, 0)
                }</p>
              </div>
              
            </div>

            {/* Close button */}
            <div className="mt-4">
              <button
                onClick={toggleModal}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;