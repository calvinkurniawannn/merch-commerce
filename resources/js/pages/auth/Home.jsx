import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const { account_code } = useParams(); // Get account_code from URL
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(`/api/stores/${account_code}`);
        if (response.ok) {
          const data = await response.json();
          setStoreInfo(data);
        } else {
          setStoreInfo(null);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
        setStoreInfo(null);
      } finally {
        setLoading(false);
      }
    };

    if (account_code) {
      fetchStore();
    } else {
      setLoading(false);
    }
  }, [account_code]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted for store:", account_code);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-500 mt-4">Loading store...</p>
        </div>
      </div>
    );
  }

  if (!storeInfo && account_code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Store Not Found</h1>
          <p className="text-gray-500 mt-4">
            The store "{account_code}" does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 relative overflow-hidden">
      {/* Decorative silhouette background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gray-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Store Logo */}
        {storeInfo?.logo && (
          <div className="mb-8 flex justify-center">
            <img
              src={`/storage/${storeInfo.logo}`}
              alt={storeInfo?.store_name || "Store Logo"}
              className="w-32 h-32 object-contain rounded-lg shadow-xl bg-white "
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          {storeInfo?.name || "Welcome to Our Store"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {storeInfo?.description ||
            `You are currently visiting ${account_code || "our store"}`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={`/${account_code}/login`}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
          >
            Login
          </Link>
          <Link
            to={`/${account_code}/register`}
            className="px-8 py-3 bg-white text-gray-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 border-2 border-gray-400 w-full sm:w-auto"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
