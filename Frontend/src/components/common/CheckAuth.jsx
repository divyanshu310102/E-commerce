import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, isLoading, children }) {
  const location = useLocation();

  // Log to verify state values
  // console.log("CheckAuth Render - isAuthenticated:", isAuthenticated, "user:", user);

  // If the authentication status is still loading, avoid redirecting
  if (isLoading) {
    return <div>Loading...</div>; // or any loader component you prefer
  }

  // If user is not authenticated and not on login or register page, redirect to login
  if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated and trying to access login/register, redirect based on user role
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    console.log(user?.role);
    if (user?.role === 'admin') {
      console.log("If");
      return <Navigate to="/admin/dashboard" />;
    } else {
      console.log("Else");
      return <Navigate to="/shop/home" />;
    }
  }

  // If authenticated and non-admin trying to access admin routes
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // If authenticated and admin trying to access shop routes
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Render children components if none of the above conditions match
  return <>{children}</>;
}

export default CheckAuth;
