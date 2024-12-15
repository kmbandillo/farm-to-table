function ProductCard({ product, addToCart }) {
  const { _id, productName, productDescription, productPrice, productQuantity, productType } = product;

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`Added ${productName} to cart!`);
  };

  const productTypeOptions = [
    { value: 1, label: 'Staple' },
    { value: 2, label: 'Fruits/Vegetables' },
    { value: 3, label: 'Livestock' },
    { value: 4, label: 'Seafood' },
    { value: 5, label: 'Others' },
  ];

  const getProductTypeLabel = (type) => {
    const option = productTypeOptions.find(option => option.value === parseInt(type));
    return option ? `${option.label} (${type})` : type;
  };

  return (
    <div className="w-[225px] p-5 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
      <img 
        className="w-[170px] h-[170px] object-cover" 
        src={product.productImage} 
        alt={productName} 
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{productName}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">{productDescription}</p>
        <p className="text-sm font-medium text-gray-600">Type: {getProductTypeLabel(product.productType)}</p>

        {productQuantity > 0 ? (
          <div className="flex items-center flex-col mt-4">
            <div className="price-qty my-3 flex items-center justify-between w-[100%]">
              <p className="text-lg font-bold text-green-600">
                <i className="fas fa-peso-sign" /> {productPrice.toFixed(2)}
              </p>
              <p className="text-sm font-medium text-gray-700">Qty: {productQuantity}</p>
            </div>
            <button 
              onClick={handleAddToCart} 
              className="px-8 py-2 text-white bg-[#75B27C] hover:bg-[#659a6b] rounded-lg w-[100%] shadow-md transition">
              Add to Cart
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm font-medium text-red-600">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;