import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;