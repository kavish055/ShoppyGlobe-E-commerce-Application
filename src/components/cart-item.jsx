import { useState } from "react";
import { useStore } from "../context/store";

const CartItem = ({ item }) => {
    const { dispatch } = useStore();
    const [imageLoaded, setImageLoaded] = useState(false);
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 bg-gray-200 rounded">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
              </div>
            )}
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover rounded transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
  
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">${item.price}</p>
  
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-12 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
  
          <div className="flex flex-col items-end justify-between">
            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
            <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  };

  
  export default CartItem;