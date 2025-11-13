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
        <div className="container mx-auto px-4 py-16 text-center">
          <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-green-600">Order Placed Successfully!</h2>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
  
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-semibold mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-semibold mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold mt-6"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
  
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                {state.cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
  
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Checkout