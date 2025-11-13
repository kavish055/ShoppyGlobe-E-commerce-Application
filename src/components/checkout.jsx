import { useState } from "react";
import { useRouter } from "../context/router";
import { useStore } from "../context/store";
import { CheckCircle } from "lucide-react";

const Checkout = () => {
  const { state, dispatch } = useStore();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);

    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-fadeInUp">
        <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold mb-4 text-green-700">Order Placed Successfully!</h2>
        <p className="text-gray-600 text-lg">Thank you for shopping with us! Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-purple-900">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Shipping Information Form */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-fuchsia-50 to-rose-100 rounded-3xl shadow-xl p-8 animate-fadeInUp">
          <h2 className="text-2xl font-extrabold mb-8 text-pink-800 border-b pb-4 border-pink-300">Shipping Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Full Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'City', name: 'city', type: 'text' },
              { label: 'ZIP Code', name: 'zipCode', type: 'text' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold mb-2 text-purple-900">{label}</label>
                <input
                  type={type}
                  required
                  value={formData[name]}
                  onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-400 transition"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-700 via-pink-600 to-yellow-400 shadow-lg text-white text-xl font-extrabold rounded-full py-4 hover:scale-105 transition-all"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-xl p-8 animate-fadeInUp">
          <h2 className="text-2xl font-extrabold mb-6 text-pink-700 border-b pb-3 border-pink-200">Order Summary</h2>

          <div className="space-y-3 mb-8 max-h-[60vh] overflow-y-auto">
            {state.cart.map(item => (
              <div key={item.id} className="flex justify-between text-md text-purple-900 font-semibold border-b border-pink-100 pb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-pink-200 pt-4 flex justify-between font-bold text-xl text-purple-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
