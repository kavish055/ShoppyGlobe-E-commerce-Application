import { Search } from "lucide-react";
import { useRouter } from "../context/router";
import { useStore } from "../context/store";
import useFetchProducts from "../hook/use-products";
import ProductItem from "./product-item";

const ProductList = () => {
    const { products, loading, error } = useFetchProducts();
    const { state, dispatch } = useStore();
    const { navigate } = useRouter();
  
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error loading products</p>
            <p>{error}</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
  
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    );
  };

  export default ProductList;