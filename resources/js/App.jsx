import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/auth/Home";

// 404 Page Component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black">404</h1>
        <p className="text-gray-500 mt-4">Store not found</p>
        <p className="text-sm text-gray-400 mt-2">
          Please use the correct store URL: /storename/login.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Store-specific auth routes - REQUIRED account_code */}
        <Route path="/:account_code/" element={<Home />} />
        <Route path="/:account_code/login" element={<Login />} />
        <Route path="/:account_code/register" element={<Register />} />

        {/* 404 for everything else */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
