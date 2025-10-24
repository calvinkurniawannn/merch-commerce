import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Simple validation for now
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("User Registered:", form);

    // simulate success
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8">
      <div className="w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-3">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <h1 className="text-2xl font-bold text-black">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">Sign up to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Address
              </label>
              <input
                type="textarea"
                name="address"
                placeholder="Enter your address"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
            >
              <span className="text-sm font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
            >
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-blue-600 hover:text-blue-700 transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2025 Merch Commerce. All rights reserved.
        </p>
      </div>
    </div>
  );
}
