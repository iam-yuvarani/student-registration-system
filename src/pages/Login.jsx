import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) =>
        item.email === loginData.email &&
        item.password === loginData.password
    );

    if (!user) {
      alert("Invalid Email or Password");
      return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Successful!");

    if (user.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
         <Link to="/" className="home-btn">
                    ← Home
                </Link>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <button className="add-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;