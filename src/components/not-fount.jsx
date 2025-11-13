import { useRouter } from "../context/router";

const NotFound = () => {
    const { navigate } = useRouter();
  
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  };

  export default NotFound;