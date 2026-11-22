import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../context/AuthContext/AuthContext";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, userRole, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading)
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  if (!user) return <Navigate to="/login" state={location.pathname} replace />;
  if (!userRole)
    return (
      <div className="p-10 text-center">
        Unable to verify your account role. Please refresh or sign in again.
      </div>
    );
  if (!allowedRoles.includes(userRole))
    return <Navigate to="/dashboard" replace />;
  return children;
};
export default RoleRoute;
