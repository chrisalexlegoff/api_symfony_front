import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user || user?.exp * 1000 < Date.now()) {
    sessionStorage.removeItem('user');
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
