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
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      );
    }
  
    if (error || !product) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error loading product</p>
            <p>{error || 'Product not found'}</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Products
        </button>
  
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative bg-gray-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
                </div>
              )}
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
  
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
              </div>
  
              <div className="mb-4">
                <span className="text-sm text-gray-600">Category: </span>
                <span className="text-sm font-semibold">{product.category}</span>
              </div>
  
              <div className="mb-4">
                <span className="text-sm text-gray-600">Brand: </span>
                <span className="text-sm font-semibold">{product.brand}</span>
              </div>
  
              <div className="mb-6">
                <span className="text-sm text-gray-600">Rating: </span>
                <span className="text-sm font-semibold">⭐ {product.rating}/5</span>
              </div>
  
              <button
                onClick={() => {
                  dispatch({ type: 'ADD_TO_CART', payload: product });
                  navigate('/cart');
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductDetail;