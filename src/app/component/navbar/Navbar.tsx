// app/components/Header.tsx
import Link from "next/link";
import { Search } from "lucide-react";
import { getSession } from "next-auth/react";

import "./nav.css";

import { links } from "../../../lib/interacts";
import { getInitials } from "@/util/getInitials";

export default function Navbar() {
  return (
    <header className="landing-header">
      <div className="header-container">
        <div className="logo-links">
          <Link href="/" className="logo">
            Whispers
          </Link>
          <nav className="main-nav">
            {links.map((link, index) => {
              return (
                <Link href="/" key={index} className="nav-links">
                  {link}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="user-actions">
          <div className="search-box">
            <Search size={20} /> {/* Control icon size */}
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search whispers"
            />
          </div>
          {/* Use divs with new classes for circular buttons */}
          <div className="action-btn add-btn">+</div>
          <div className="action-btn avatar-btn">
            {getInitials("Wilson Fisk")}
          </div>
        </div>
      </div>
    </header>
  );
}
