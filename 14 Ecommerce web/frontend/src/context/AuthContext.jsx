// ============================================================
// context/AuthContext.jsx — Authentication Global State
// ============================================================
// This context manages the entire authentication lifecycle:
//
// STATE:
//   - user: The current user object (null if logged out)
//   - token: The JWT stored in localStorage
//   - loading: True while checking localStorage on mount
//
// HOW JWT PERSISTENCE WORKS:
//   1. On login/signup, the JWT is stored in localStorage.
//   2. On page refresh, useEffect reads the token from
//      localStorage and fetches the user's profile from
//      the backend using that token.
//   3. On logout, the token is removed from localStorage.
//
// HOW THE JWT IS SENT TO THE BACKEND:
//   Every API call to a protected route includes the header:
//     Authorization: Bearer <token>
//   The backend's authMiddleware.js verifies this token.
// ============================================================

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// ---- Base URL for all API calls ----
const API_URL = "http://localhost:18451/api/users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ---- On mount: If a token exists in localStorage, fetch the user profile ----
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await fetch(`${API_URL}/profile`, {
            headers: {
              // This is how the JWT is passed to the backend
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            // Token is invalid or expired — clear everything
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error("Failed to load user:", err);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // ---- SIGNUP: Register new user ----
  const signup = async (name, email, password) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Store JWT in localStorage for persistence across page refreshes
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data);
    return data;
  };

  // ---- LOGIN: Authenticate existing user ----
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Store JWT in localStorage for persistence
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data);
    return data;
  };

  // ---- LOGOUT: Clear token and user ----
  const logout = () => {
    localStorage.removeItem("token"); // Remove JWT from localStorage
    setToken(null);
    setUser(null);
  };

  // ---- UPDATE PROFILE: Send updated fields with JWT in header ----
  const updateProfile = async (updates) => {
    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Attach the JWT so the backend knows who we are
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Update token if a new one was returned
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => useContext(AuthContext);
