import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ShoppingCart from './ShoppingCart';
import ReactPaginate from 'react-paginate';
import '@fortawesome/fontawesome-free/css/all.min.css';
import image from '../../assets/mainbg.jpg';
import Footer from '../Footer';

function StorePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortOption, setSortOption] = useState('priceAsc');
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
    loadCartFromLocalStorage();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3002/getproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'nameAsc':
        return products.sort((a, b) => a.productName.localeCompare(b.productName));
      case 'nameDesc':
        return products.sort((a, b) => b.productName.localeCompare(a.productName));
      case 'priceAsc':
        return products.sort((a, b) => a.productPrice - b.productPrice);
      case 'priceDesc':
        return products.sort((a, b) => b.productPrice - a.productPrice);
      case 'typeAsc':
        return products.sort((a, b) => a.productType - b.productType);
      case 'typeDesc':
        return products.sort((a, b) => b.productType - a.productType);
      case 'quantityAsc':
        return products.sort((a, b) => a.productQuantity - b.productQuantity);
      case 'quantityDesc':
        return products.sort((a, b) => b.productQuantity - a.productQuantity);
      default:
        return products;
    }
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (product) => {
    const productIndex = cart.findIndex(item => item._id === product._id);
    let updatedCart;
    if (productIndex !== -1) {
      if (cart[productIndex].quantity < product.productQuantity) {
        updatedCart = cart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...cart];
      }
    } else {
      updatedCart = [...cart, { ...product, quantity: 1, availableQuantity: product.productQuantity }];
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartVisible(true);
  };

  const removeFromCart = (removeProduct) => {
    const updatedCart = cart.filter(product => product._id !== removeProduct._id);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartVisible(cart.length > 1);
  };

  const updateItemQuantity = (product, updatedQuantity) => {
    let updatedCart;
    if (updatedQuantity === 0) {
      updatedCart = cart.filter(item => item._id !== product._id);
    } else {
      updatedCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: updatedQuantity } : item
      );
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setIsCartVisible(updatedQuantity > 0);
  };

  return (
    <div className="app">
      <div
        className="bg-cover bg-center bg-no-repeat h-screen"
        style={{
          backgroundImage: `url(${'https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg'})`,
        }}
      >
      <div className='h-[300px]'>
        <div className='bg-black/50 h-full'>
            <div className='pt-[150px]'>
              <p className='text-white text-center text-3xl'>Welcome to <b>AgriLink's store</b></p>
              <p className='text-white text-center'>Browse from these available fresh and nutritious products.</p>
            </div>
        </div>
      </div>
      <div className="w-full flex bg-white">
      <div className='left-container w-[70%]'>
        <div className='flex p-10'>
          <div className='w-[90%]'>
            <p className='text-4xl font-extrabold'>Products</p>
          </div>
          <div className="sort-options text-center justify-end">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="nameAsc">Name (A to Z)</option>
              <option value="nameDesc">Name (Z to A)</option>
              <option value="priceAsc">Price (Low to High)</option>
              <option value="priceDesc">Price (High to Low)</option>
              <option value="typeAsc">Type (A to Z)</option>
              <option value="typeDesc">Type (Z to A)</option>
              <option value="quantityAsc">Quantity (Low to High)</option>
              <option value="quantityDesc">Quantity (High to Low)</option>
            </select>
          </div>
        </div>
        <div className="m-auto mb-10 w-[85%] grid m-6 gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortProducts(products).map(product => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
        </div>

        {/* Shopping Cart */}
        {isCartVisible && (
          <div className="w-[30%] bg-lime-100 p-5">
            <ShoppingCart
              cart={cart}
              removeFromCart={removeFromCart}
              updateItemQuantity={updateItemQuantity}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
    </div>
  );
}

export default StorePage;