import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Eye, EyeOff, MapPin, LocateFixed } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support location detection.");
      return;
    }

    setLoadingLocation(true);
    setLocationMessage("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();
          const address = data.address || {};

          const detectedCity =
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            "";

          if (detectedCity) {
            setCity(detectedCity);
            setLocationMessage(`Location detected: ${detectedCity}`);
          } else {
            setLocationMessage("City could not be identified. Please enter it manually.");
          }
        } catch {
          setLocationMessage("Could not detect your city. Please enter it manually.");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        setLocationMessage("Location permission was not granted. You can enter your city manually.");
        setLoadingLocation(false);
      }
    );
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      localStorage.setItem("tripnestToken", data.token);
      localStorage.setItem("tripnestUser", JSON.stringify(data.user));
      localStorage.setItem("tripnestCity", city.trim());

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
          <p>YOUR NEXT CHAPTER BEGINS</p>
          <h1>Dream big.<br />Travel further.</h1>
          <span>Start saving today for the places you'll love tomorrow.</span>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-form-container">
          <p className="login-welcome">JOIN THE TRIPNEST COMMUNITY</p>
          <h2>Create account</h2>
          <p className="login-subtitle">
            Your next adventure is just a few steps away.
          </p>

          <form onSubmit={handleSignup}>
            <label>Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Create password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
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

            <div className="signup-location">
              <label>
                <MapPin size={15} /> Where are you travelling from?
              </label>

              <input
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setLocationMessage("");
                }}
                placeholder="Enter your city (e.g. Bengaluru)"
              />

              <button
                type="button"
                className="location-detect-button"
                onClick={getCurrentLocation}
                disabled={loadingLocation}
              >
                <LocateFixed size={16} />
                {loadingLocation ? "Detecting location..." : "Use my current location"}
              </button>

              {locationMessage && (
                <p className="location-message">{locationMessage}</p>
              )}

              <small>You can also skip this and add your city later.</small>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create my account"}
            </button>
          </form>

          <p className="login-signup">
            Already a member? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}