import { ShoppingCart } from "lucide-react";
import { useRouter } from "../context/router";
import { useStore } from "../context/store";
import CartItem from "./cart-item";

const Cart = () => {
  const { state } = useStore();
  const { navigate } = useRouter();

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center animate-fadeInUp">
        <div className="rounded-full bg-gradient-to-br from-fuchsia-200 via-rose-100 to-yellow-100 p-7 flex flex-col items-center shadow-xl mb-6">
          <ShoppingCart className="w-24 h-24 text-fuchsia-400 mb-0 animate-cart-bounce" />
        </div>
        <h2 className="text-2xl font-extrabold mb-3 text-purple-900">Your cart is empty</h2>
        <p className="mb-7 text-gray-400 text-lg">Looks like you haven’t added any items yet.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-pink-500 via-fuchsia-700 to-yellow-400 shadow-md text-white px-6 py-3 rounded-full hover:scale-105 transition-all font-semibold text-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-900">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {state.cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white via-yellow-50 to-fuchsia-50 rounded-2xl shadow-2xl p-7 sticky top-24 min-w-[260px] animate-fadeInUp">
            <h2 className="text-xl font-extrabold mb-6 text-pink-800">Order Summary</h2>

            <div className="space-y-2 mb-7">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-bold text-fuchsia-700">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-700 font-semibold">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-purple-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-fuchsia-700 via-pink-600 to-yellow-400 shadow-lg text-white px-6 py-3 rounded-full hover:scale-105 transition-all font-bold text-lg focus:ring-2 focus:ring-fuchsia-400"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
