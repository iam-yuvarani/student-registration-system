import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(storedUsers);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  const editUser = (user) => {
    setEditingUser(user);
  };

  const updateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setEditingUser(null);
  };

  const deleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      const updatedUsers = users.filter(
        (user) => user.id !== id
      );

      setUsers(updatedUsers);

      localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
      );
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="stats-card">
        <div className="stats-icon">
          🧑🏻‍💻
        </div>

        <div className="stats-content">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
      </div>
      <div className="table-card">
        <h2>Admin Dashboard</h2>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {editingUser && (
          <div className="form-card">
            <h2>Edit Employee</h2>

            <input
              type="text"
              className="search-input"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              className="search-input"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <input
              type="text"
              className="search-input"
              value={editingUser.mobile}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  mobile: e.target.value,
                })
              }
            />

            <button
              className="add-btn"
              onClick={updateUser}
            >
              Update Employee
            </button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.role}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => editUser(user)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
         <Link to="/" className="home-btn">
          ← Home
        </Link>
          <div className="dashboard-buttons">


          <button
            className="delete-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
    
  );
}


export default AdminDashboard;