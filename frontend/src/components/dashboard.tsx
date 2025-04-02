import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css' ;

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5703/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error: unknown) {
      setError("Failed to fetch users.");
    }
  };

  const handleUpdateUser = async (userId: number) => {
    if (!newUsername && !newEmail) {
      setError("Please provide a new username or email.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updateData: any = {};
      if (newUsername) updateData.name = newUsername;
      if (newEmail) updateData.email = newEmail;

      await axios.put(`http://localhost:5703/auth/update/${userId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User updated successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...updateData } : user
        )
      );

      setNewUsername("");
      setNewEmail("");
      setEditUserId(null);
    } catch (error: unknown) {
      setError("Error updating user.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5703/auth/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User deleted successfully");

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error: unknown) {
      setError("Error deleting user.");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
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
                      <button className="edit" onClick={() => handleUpdateUser(user.id)}>Save</button>
                      <button onClick={() => setEditUserId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit" onClick={() => setEditUserId(user.id)}>Edit</button>
                      <button className="delete" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;




