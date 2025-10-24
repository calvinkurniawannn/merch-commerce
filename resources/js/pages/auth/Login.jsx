import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/button";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { account_code } = useParams(); // Get account_code from URL
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    const formData = new FormData(e.target);
    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
      account_code: account_code,
    };

    try {
      // Call Laravel login endpoint directly
      const response = await fetch(`/${account_code}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid username or password");
      }

      // Refresh user data in context
      await refreshUser();

      // Laravel controller will return user data with role
      // Redirect based on user role
      if (data.role === "seller") {
        navigate(`/${account_code}/seller/dashboard`);
      } else if (data.role === "customer") {
        navigate(`/${account_code}`);
      } else {
        // Default redirect for other roles
        navigate(`/${account_code}`);
      }
    } catch (error) {
      setLoginError(error.message || "Invalid username or password");
    } finally {
      setLoggingIn(false);
    }
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            {storeInfo?.logo ? (
              <img
                src={`/storage/${storeInfo.logo}`}
                alt={storeInfo.store_name}
                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
              />
            ) : (
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <span className="text-white text-2xl font-bold">
                  {storeInfo?.store_name?.[0] ||
                    account_code?.[0]?.toUpperCase() ||
                    "M"}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-black">Welcome</h1>
            <p className="text-gray-500 mt-2">
              Sign in to {storeInfo?.store_name || account_code}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Fill your username"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
                disabled={loggingIn}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
                disabled={loggingIn}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loggingIn}
            >
              {loggingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
            >
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
            >
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to={`/${account_code}/register`}
              className="font-medium text-blue-600 hover:text-blue-700 transition"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          © 2025 Merch Commerce. All rights reserved.
        </p>
      </div>
    </div>
  );
}
