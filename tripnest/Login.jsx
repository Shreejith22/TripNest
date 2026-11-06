import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("tripnestToken", data.token);
      localStorage.setItem("tripnestUser", JSON.stringify(data.user));

      navigate("/home");

    } catch (err) {
      setError("Cannot connect to TripNest server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-visual">
        <div className="login-brand">
          <Plane size={25} />
          <span>TripNest</span>
        </div>

        <div className="login-message">
          <p>YOUR JOURNEY, YOUR WAY</p>
          <h1>Save smart.<br />Travel more.</h1>
          <span>Your next beautiful adventure begins here.</span>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-form-container">
          <p className="login-welcome">WELCOME TO TRIPNEST</p>
          <h2>Welcome back!</h2>
          <p className="login-subtitle">
            Sign in to continue your travel journey.
          </p>

          <form onSubmit={handleLogin}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="login-signup">
            New to TripNest? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}