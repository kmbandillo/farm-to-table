import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CartItem({ item, removeFromCart, updateItemQuantity }) {
    const { _id, productName, productPrice, productImage, quantity, availableQuantity } = item;

    const handleRemoveFromCart = () => {
        removeFromCart(item);
        console.log(`Removed all ${productName}s from cart!`);
    };

    const handleIncrease = () => {
        if (quantity < availableQuantity) {
            updateItemQuantity(item, quantity + 1);
            console.log(`Added ${productName} to cart!`);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateItemQuantity(item, quantity - 1);
            console.log(`Removed ${productName} from cart!`);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 1 && value <= availableQuantity) {
            updateItemQuantity(item, value);
        }
    };

    return (
        <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-lg mb-2">
            {/* Product Image */}
            <img src={productImage} alt={productName} className="w-[80px] h-[80px] object-cover rounded-md" />

            <div className="flex-1 ml-4">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-800 truncate">{productName}</h3>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-2">
                    <button 
                        onClick={handleDecrease} 
                        className="px-2 py-1 bg-gray-200 rounded-md text-xl text-gray-600 hover:bg-gray-300"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="w-12 text-center border border-gray-300 rounded-md"
                        value={quantity}
                        min="1"
                        max={availableQuantity}
                        onChange={handleQuantityChange}
                    />
                    <button 
                        onClick={handleIncrease} 
                        className="px-2 py-1 bg-gray-200 rounded-md text-xl text-gray-600 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>

                {/* Price */}
                <p className="text-sm font-medium text-gray-700 mt-2 px-5">
                    <i className="fas fa-peso-sign" /> {productPrice * quantity}
                </p>
            </div>

            {/* Remove Button */}
            <button 
                onClick={handleRemoveFromCart} 
                className=" bg-red-500 rounded-xl p-3 text-sm text-black-600 hover:text-red-800 focus:outline-none"
            >
                Remove Item
            </button>
        </div>
    );
}

export default CartItem;
