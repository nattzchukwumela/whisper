"use client";
import { useEffect, useState } from "react";
import HomePage from "./landing_page/LandingPage";
import { fetchWithAuth } from "@/util/fetchWithAuth";
import { User } from "@/lib/type";
import WhispersUI from "./dashboard/home";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fullUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchWithAuth("/api/protected/me", {
          method: "GET",
        });
        if (data.success) {
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
