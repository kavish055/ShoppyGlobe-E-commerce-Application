import { useState } from "react";
import { useStore } from "../context/store";

const ProductItem = ({ product, navigate }) => {
    const { dispatch } = useStore();
    const [imageLoaded, setImageLoaded] = useState(false);
  
    const handleAddToCart = (e) => {
      e.stopPropagation();
      dispatch({ type: 'ADD_TO_CART', payload: product });
    };
  
    return (
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="relative h-48 bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
            </div>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ProductItem;