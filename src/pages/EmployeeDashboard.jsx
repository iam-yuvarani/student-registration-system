import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EmployeeDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="container">
        <h2>No User Logged In</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="table-card">
        <h2>Employee Dashboard</h2>

        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{currentUser.name}</td>
            </tr>

            <tr>
              <th>Email</th>
              <td>{currentUser.email}</td>
            </tr>

            <tr>
              <th>Mobile</th>
              <td>{currentUser.mobile}</td>
            </tr>

            <tr>
              <th>Role</th>
              <td>{currentUser.role}</td>
            </tr>
          </tbody>
        </table>
        <button className="add-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;