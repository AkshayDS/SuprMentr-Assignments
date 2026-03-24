// ============================================================
// pages/Profile.jsx — Protected User Profile Page
// ============================================================
// This page is only accessible when the user is logged in.
// It fetches the user's data from AuthContext and displays
// an editable form for name, address, and phone number.
//
// HOW THE PROTECTED ROUTE WORKS:
// 1. The useAuth() hook provides the current user and token.
// 2. If no user is logged in, we redirect to /login.
// 3. The updateProfile() function sends the updated data to
//    PUT /api/users/profile with the JWT in the header.
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    try {
      await updateProfile({ name, address, phone });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p style={{ textAlign: "center", padding: "4rem" }}>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        {/* Status Messages */}
        {message && <div className="auth-success">{message}</div>}
        {error && <div className="auth-error">{error}</div>}

        {/* Profile Form */}
        <form onSubmit={handleUpdate} className="profile-form">
          <h2>Account Details</h2>

          <div className="form-group">
            <label htmlFor="profileName">Full Name</label>
            <input
              id="profileName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileEmail">Email Address</label>
            <input
              id="profileEmail"
              type="email"
              value={email}
              disabled
              className="input-disabled"
            />
            <small className="form-hint">Email cannot be changed</small>
          </div>

          <h2>Shipping Information</h2>

          <div className="form-group">
            <label htmlFor="profileAddress">Shipping Address</label>
            <textarea
              id="profileAddress"
              placeholder="123 Main St, City, State, ZIP"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePhone">Phone Number</label>
            <input
              id="profilePhone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="profile-actions">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
