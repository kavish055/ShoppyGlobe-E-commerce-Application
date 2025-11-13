import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore } from "../context/store";

const CartItem = ({ item }) => {
  const { dispatch } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } });
    }
  };

  const handleIncrease = () => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
  };

  return (
    <div className="bg-gradient-to-br from-white via-rose-50 to-fuchsia-50 rounded-2xl shadow-lg p-5 mb-6 flex items-center gap-5 hover:shadow-2xl transition-shadow duration-300 relative group">
      <div className="relative w-28 h-28 rounded-3xl overflow-hidden bg-gradient-to-tr from-purple-200 via-yellow-100 to-fuchsia-200 shadow-inner">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-fuchsia-400 border-t-yellow-300 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity rounded-3xl ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between h-full">
        <h3 className="font-extrabold text-xl text-purple-900 truncate mb-1">{item.title}</h3>
        <p className="text-fuchsia-700 font-semibold text-lg mb-4">${item.price.toFixed(2)}</p>

        <div className="flex items-center space-x-4">
          <button
            aria-label="Decrease quantity"
            onClick={handleDecrease}
            disabled={item.quantity === 1}
            className={`w-10 h-10 rounded-full border border-fuchsia-500 text-fuchsia-600 font-bold text-xl flex justify-center items-center hover:bg-fuchsia-200 transition disabled:opacity-40 disabled:pointer-events-none`}
          >
            -
          </button>
          <span className="text-xl font-semibold text-purple-900 w-10 text-center">{item.quantity}</span>
          <button
            aria-label="Increase quantity"
            onClick={handleIncrease}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-600 to-yellow-400 text-white font-bold text-xl flex justify-center items-center shadow-lg hover:shadow-xl transition"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <button
          onClick={handleRemove}
          aria-label={`Remove ${item.title} from cart`}
          className="text-red-600 hover:text-red-800 rounded-full transition transform group-hover:scale-110 focus:outline-none"
          title="Remove item"
        >
          <Trash2 className="w-6 h-6" />
        </button>
        <p className="font-extrabold text-2xl text-purple-900">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
