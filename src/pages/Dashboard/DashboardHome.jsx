import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../../context/AuthContext/AuthContext";

const DashboardHome = () => {
  const { userRole, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner" />
      </div>
    );
  if (userRole === "admin") return <Navigate to="/dashboard/users" replace />;
  if (userRole === "hr")
    return <Navigate to="/dashboard/my-posted-jobs" replace />;
  if (userRole === "applicant")
    return <Navigate to="/dashboard/my-applications" replace />;
  return (
    <p className="p-10">
      Your role is not configured. Contact an administrator.
    </p>
  );
};
export default DashboardHome;
