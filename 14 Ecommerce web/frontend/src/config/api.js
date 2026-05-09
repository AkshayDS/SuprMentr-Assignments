// ============================================================
// src/config/api.js — Centralized API Base URL
// ============================================================
// In local dev:  reads from .env.local  → http://localhost:18451
// In production: reads from Vercel env  → https://your-app.onrender.com
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:18451';

export default BASE_URL;
