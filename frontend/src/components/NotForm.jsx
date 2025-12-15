import { ChevronLeft, Frown, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotForm = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-20">
      <main className="flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-8">
            <Frown className="w-10 h-10" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/">
            <button
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </button> 
            </Link>
            <Link to="/">
            <button
              className="flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotForm