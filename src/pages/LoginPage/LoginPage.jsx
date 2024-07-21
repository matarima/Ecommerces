import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../UserContext";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
    console.log(userArr);

    const user = userArr.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    login(user);
    navigate("/");
  };
  return (
    <div className="image-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="form-style">
              <h2 className="mb-3 card-title text-center">Sign In</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                SIGN IN
              </button>
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
