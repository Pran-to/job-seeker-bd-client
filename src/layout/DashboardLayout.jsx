import { NavLink, Outlet, Link } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";

const DashboardLayout = () => {
  const { user, userRole, logOut } = useContext(AuthContext);
  const admin = userRole === "admin";
  const hr = userRole === "hr";
  const links = admin
    ? [
        { to: "/dashboard/users", label: "Manage Users" },
        { to: "/dashboard/my-posted-jobs", label: "All My Job Posts" },
        { to: "/dashboard/add-job", label: "Post a Job" },
      ]
    : hr
      ? [
          { to: "/dashboard/my-posted-jobs", label: "My Posted Jobs" },
          { to: "/dashboard/add-job", label: "Post a Job" },
        ]
      : [
          { to: "/dashboard/my-applications", label: "My Applications" },
          { to: "/find-jobs", label: "Find Jobs" },
        ];
  return (
    <div className="min-h-[75vh] md:grid md:grid-cols-[250px_1fr]">
      <aside className="bg-base-200 p-5 md:min-h-full">
        <h2 className="text-xl font-bold mb-1">Dashboard</h2>
        <p className="text-xs text-base-content/60 break-all">{user?.email}</p>
        <span className="badge badge-primary mt-3 uppercase">{userRole}</span>
        <nav className="menu mt-6 gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
          <li>
            <Link to="/">Back to website</Link>
          </li>
          <li>
            <button onClick={logOut}>Logout</button>
          </li>
        </nav>
      </aside>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardLayout;
