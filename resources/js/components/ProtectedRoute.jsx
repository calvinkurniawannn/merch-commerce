import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black">404</h1>
        <p className="text-gray-500 mt-4">Page not found</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, isAuthenticated } = useAuth();
  const { account_code } = useParams();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show 404
  if (!isAuthenticated) {
    return <NotFound />;
  }

  // If requiredRole is specified, check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    return <NotFound />;
  }

  // If user is authenticated and authorized, render the children
  return children;
}