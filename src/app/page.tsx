"use client";
import { useEffect, useState } from "react";
import HomePage from "./landing_page/LandingPage";
import { fetchWithAuth } from "@/util/fetchWithAuth";
import { User } from "@/lib/type";
import WhispersUI from "./dashboard/page";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fullUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchWithAuth("/api/protected/me", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) return <HashLoader color="#3498db" size={80} />;
  return user ? <WhispersUI user={user} link={fullUrl} /> : <HomePage />;
}
