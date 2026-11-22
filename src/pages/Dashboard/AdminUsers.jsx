import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_SERVER_URL;

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const requestHeaders = async () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${await user.getIdToken()}`,
  });

  const loadUsers = useCallback(async () => {
    if (!user) return;
    try {
      setError("");
      const response = await fetch(`${API}/admin/users`, {
        headers: await requestHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load users");
      setUsers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const changeRole = async (target, role) => {
    try {
      setBusy(target._id);
      const response = await fetch(`${API}/admin/users/${target._id}/role`, {
        method: "PATCH",
        headers: await requestHeaders(),
        body: JSON.stringify({ role }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Role update failed");
      setUsers((old) =>
        old.map((item) =>
          item._id === target._id ? { ...item, role: result.role } : item,
        ),
      );
      toast.success(`${target.email} is now ${result.role}`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy("");
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  return (
    <section className="p-4 md:p-8">
      <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-base-content/60 mt-1">
            Only administrators can assign or remove HR access.
          </p>
        </div>
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={loadUsers}
        >
          Refresh
        </button>
      </div>
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl border border-base-content/10">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td className="font-semibold">{item.name || "—"}</td>
                <td>{item.email}</td>
                <td>
                  <span className="badge badge-outline">{item.role}</span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={item.role}
                    disabled={busy === item._id || item.email === user.email}
                    onChange={(e) => changeRole(item, e.target.value)}
                  >
                    <option value="applicant">Applicant</option>
                    <option value="HR">HR</option>
                    {item.role === "admin" && (
                      <option value="admin">Admin</option>
                    )}
                  </select>
                  {item.email === user.email && (
                    <span className="text-xs ml-2 text-base-content/50">
                      Your account
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan="4" className="text-center py-8">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default AdminUsers;
