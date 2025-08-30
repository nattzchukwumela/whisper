"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { links } from "../../../lib/interacts";
import { getInitials } from "@/util/getInitials";
import "./nav.css";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/protected/me", { method: "GET" });
        if (res.status === 401) {
          router.push("/auth");
        }
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    getUser();
  }, []);

  return (
    <header className="landing-header">
      <div className="header-container">
        <div className="logo-links">
          <Link href="/" className="logo">
            Whispers
          </Link>
          <nav className="main-nav">
            {links.map((link, index) => (
              <Link href="/" key={index} className="nav-links">
                {link}
              </Link>
            ))}
          </nav>
        </div>

        <div className="user-actions">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search whispers"
            />
          </div>
          <div className="action-btn add-btn">+</div>
          <div className="action-btn avatar-btn">
            {user ? getInitials(user.name) : "??"}
          </div>
        </div>
      </div>
    </header>
  );
}
