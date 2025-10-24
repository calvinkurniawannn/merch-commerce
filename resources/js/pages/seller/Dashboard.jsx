import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SellerDashboard() {
  const { account_code } = useParams(); // Get account_code from URL
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  // Fetch store information based on account_code
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

  return <div>asd</div>;
}
