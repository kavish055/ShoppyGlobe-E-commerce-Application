import { useRouter } from "../context/router";

const NotFound = () => {
  const { navigate } = useRouter();

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center animate-fadeInUp">
      <h1 className="text-9xl font-extrabold text-gradient bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 mb-6 select-none">
        404
      </h1>
      <h2 className="text-4xl font-extrabold mb-4 text-purple-900">Page Not Found</h2>
      <p className="text-gray-600 max-w-xl mb-10 text-center text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-gradient-to-r from-fuchsia-700 via-pink-600 to-yellow-400 shadow-lg text-white px-6 py-3 rounded-full hover:scale-105 transition-transform font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-fuchsia-400"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
