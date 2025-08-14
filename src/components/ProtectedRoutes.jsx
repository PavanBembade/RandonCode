import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  console.log(user, "stored");
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
