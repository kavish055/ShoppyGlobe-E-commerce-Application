import { Search, AlertTriangle } from "lucide-react";
import { useRouter } from "../context/router";
import { useStore } from "../context/store";
import useFetchProducts from "../hook/use-products";
import ProductItem from "./product-item";

// List of products with search feature, loading/error animations, and animations for cards
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
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-2">
        <div className="relative flex justify-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute"></div>
          <div className="w-10 h-10 border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin" style={{animationDuration: "1.2s"}}></div>
        </div>
        <span className="text-lg text-purple-600 font-bold animate-pulse">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-300 text-rose-700 px-6 py-4 rounded-xl shadow-xl animate-fade-in">
          <AlertTriangle className="w-6 h-6 text-rose-500" />
          <div>
            <p className="font-bold text-lg">Error loading products</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      {/* Search input with glassmorphism and focus effect */}
      <div className="mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-6 h-6 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for amazing products…"
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className="w-full md:w-2/3 lg:w-1/2 pl-12 pr-4 py-3 rounded-xl shadow focus:ring-2 focus:ring-fuchsia-500 border border-purple-200 bg-white/80 backdrop-blur-md text-gray-700 text-lg transition-all duration-200 outline-none hover:shadow-xl"
            autoFocus
            aria-label="Search products"
          />
        </div>
      </div>

      {/* Responsive product grid with stagger-in animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 animate-fadeInUp">
        {filteredProducts.map((product, i) => (
          <div
            style={{ animationDelay: `${i * 70}ms` }}
            className="animate-slideInUp"
            key={product.id}
          >
            <ProductItem product={product} navigate={navigate} />
          </div>
        ))}
      </div>

      {/* No results message (gentle UX) */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center py-16 animate-fadeInUp">
          <img src="/assets/empty.svg" alt="No products" className="w-40 mb-2 opacity-80" loading="lazy" />
          <p className="text-rose-600 text-xl font-semibold">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
