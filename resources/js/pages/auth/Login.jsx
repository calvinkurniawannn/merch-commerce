import { Link } from "react-router-dom";
import Button from "../../components/button";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Fill your username"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
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

            <Button type="submit" variant="primary" className="w-full">
              Sign In
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
              to="/register"
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
