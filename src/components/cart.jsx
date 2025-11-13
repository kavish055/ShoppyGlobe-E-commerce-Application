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
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
  
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {state.cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
  
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
  
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
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