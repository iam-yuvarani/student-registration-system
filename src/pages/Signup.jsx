import { useState } from "react";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs"

function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        role: "Employee",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check all fields
        if (
            !user.name ||
            !user.email ||
            !user.mobile ||
            !user.password ||
            !user.confirmPassword
        ) {
            alert("Please fill all fields");
            return;
        }

        // Check password match
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check email already exists
        const emailExists = users.find(
            (item) => item.email === user.email
        );

        if (emailExists) {
            alert("Email already registered");
            return;
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = {
            id: Date.now(),
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            password: hashedPassword,
            role: user.role,
        };

        // Save to localStorage
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        // Clear form
        setUser({
            name: "",
            email: "",
            mobile: "",
            role: "Employee",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="container">
            <div className="form-card">
                <Link to="/" className="home-btn">
                    ← Home
                </Link>
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter mobile number"
                            value={user.mobile}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>

                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option>Employee</option>
                            <option>Admin</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="add-btn">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;