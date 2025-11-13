import { useEffect, useState } from "react";
import { useStore } from "../context/store";
import { useRouter } from "../context/router";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { dispatch } = useStore();
  const { navigate } = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute"></div>
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" style={{animationDuration: '1.2s'}}></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 animate-fadeIn">
        <div className="bg-rose-100 border border-rose-400 text-rose-700 px-6 py-5 rounded-xl shadow-lg flex flex-col items-center gap-2">
          <h3 className="font-bold text-lg">Error loading product</h3>
          <p>{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-gradient-to-r from-pink-500 via-fuchsia-700 to-yellow-400 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-fadeInUp">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-purple-700 font-semibold hover:underline"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10 p-10">
        {/* Image Section */}
        <div className="relative bg-gradient-to-tr from-purple-100 via-yellow-50 to-fuchsia-100 rounded-2xl overflow-hidden" style={{ height: '420px' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-fuchsia-400 border-t-yellow-300 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-contain rounded-2xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-purple-900">{product.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <span className="text-5xl font-extrabold text-fuchsia-700">${product.price}</span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-600 font-medium">Category: </span>
              <span className="text-sm font-semibold text-pink-700">{product.category}</span>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-600 font-medium">Brand: </span>
              <span className="text-sm font-semibold text-pink-700">{product.brand}</span>
            </div>

            <div className="mb-8 inline-block rounded-xl bg-pink-200/60 px-3 py-1 text-pink-600 font-semibold shadow-sm">
              Rating: ⭐ {product.rating}/5
            </div>
          </div>

          <button
            onClick={() => {
              dispatch({ type: 'ADD_TO_CART', payload: product });
              navigate('/cart');
            }}
            className="w-full bg-gradient-to-r from-pink-600 via-fuchsia-700 to-yellow-400 text-white font-extrabold py-4 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105 text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
