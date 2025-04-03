import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

interface Irequest {
  id: number;
  name: string;
  email: string;
  role: string;
}
const AdminDashboard = () => {
  const [users, setUsers] = useState<Irequest[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    getUserRole();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:5002/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(Array.isArray(response.data) ? response.data : [response.data]);
      console.log(users);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5002/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user role");
    }
  };

  const handleUpdateUser = async (userId: number) => {
    if (!newUsername && !newEmail) {
      setError("Please enter a new name or email.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updateData: any = {};
      if (newUsername) updateData.name = newUsername;
      if (newEmail) updateData.email = newEmail;

      await axios.put(`http://localhost:5002/auth/edit/${userId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User updated successfully!");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...updateData } : user
        )
      );

      setNewUsername("");
      setNewEmail("");
      setEditUserId(null);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error updating user.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5002/auth/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User deleted successfully!");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error: any) {
      setError(error.response?.data?.message || "Error deleting user.");
    }
  };

  return (
    <div className="container">
      <h2> Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {userRole === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {userRole === "admin" && (
                    <td>
                      {editUserId === user.id ? (
                        <>
                          <input
                            type="text"
                            placeholder="New Name"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                          />
                          <input
                            type="email"
                            placeholder="New Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                          />
                          <button
                            className="edit"
                            onClick={() => handleUpdateUser(user.id)}
                          >
                            Save
                          </button>
                          <button onClick={() => setEditUserId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="edit"
                            onClick={() => setEditUserId(user.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
