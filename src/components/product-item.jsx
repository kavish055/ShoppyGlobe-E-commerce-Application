import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../context/store";

const ProductItem = ({ product, navigate }) => {
  const { dispatch } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-gradient-to-br from-white via-fuchsia-50 to-rose-100 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.04] transition-all duration-300 cursor-pointer border border-purple-100 relative"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
    >
      {/* Alert message */}
      {added && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-xl bg-gradient-to-tr from-fuchsia-400 via-pink-400 to-yellow-200 text-white text-sm font-semibold drop-shadow-xl animate-fade-in">
          Added to cart!
        </div>
      )}

      <div className="relative h-44 md:h-52 bg-gradient-to-tr from-purple-100 via-yellow-50 to-fuchsia-100">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-fuchsia-400 border-t-yellow-300 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 scale-[1.02] shadow-none group-hover:scale-105 group-hover:shadow-xl ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-bold text-xl truncate mb-1 text-purple-900">{product.title}</h3>
        <p className="text-gray-500 text-base mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[1.4rem] font-bold text-fuchsia-700">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className={`relative flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 via-pink-500 to-yellow-400 shadow-lg text-white px-4 py-2 rounded-full transition-all font-semibold hover:scale-105 hover:shadow-xl outline-none focus:ring-2 focus:ring-fuchsia-400 ${added ? "pointer-events-none opacity-80" : ""}`}
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5 animate-cart-bounce" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
