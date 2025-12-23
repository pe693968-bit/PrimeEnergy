'use client'
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    document.cookie = "isLoggedIn=; Max-Age=0; path=/";
    router.push("/login");
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
    >
      Logout
    </button>
  );
}
