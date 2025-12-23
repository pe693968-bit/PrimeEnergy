'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials from .env.local
    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      // Save login state in localStorage
      localStorage.setItem("isLoggedIn", "true");
      // Also set cookie for middleware route protection
      document.cookie = "isLoggedIn=true; path=/";
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#f2801c] text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
