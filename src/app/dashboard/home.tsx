"use client";
import React, { useState, useEffect } from "react";
import { Copy, Mail, User, Moon, Sun } from "lucide-react";
import "./style.css";
import { WhispersUIProps } from "@/lib/type";
import Link from "next/link";

const WhispersUI = ({ user, link }: WhispersUIProps) => {
  const [isDark, setIsDark] = useState(true);
  const [username, setUsername] = useState("SilentSpecter23");
  const [copied, setCopied] = useState(false);
  const [messageCount] = useState(12);

  const specialLink = `${link}u/${user.uniqueLink}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(specialLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`whispers-container ${isDark ? "dark" : "light"}`}>
      <div className="whispers-content">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Header */}
        <div className="header">
          <h1 className="title">Whispers</h1>
          <p className="subtitle">Share your thoughts anonymously.</p>
        </div>

        {/* Main Card */}
        <div className="main-card">
          {/* Username Section */}
          <div className="input-section">
            <label className="input-label">Your Username</label>
            <div className="username-input">
              <User size={18} className="input-icon" />
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUsername(e.target.value)}
                className="username-field"
              />
            </div>
          </div>

          {/* Special Link Section */}
          <div className="input-section">
            <label className="input-label">Your Special Link</label>
            <div className="link-container">
              <div className="link-display">
                <span className="link-text">{specialLink}</span>
                <button
                  className={`copy-button ${copied ? "copied" : ""}`}
                  onClick={handleCopyLink}
                >
                  <Copy size={16} />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
              <p className="link-description">
                Share this link to receive anonymous messages.
              </p>
            </div>
          </div>

          {/* Messages Button */}
          <div className="messages-section">
            <button className="messages-button">
              <Link href={`${link}r/${user.uniqueLink}`}>
                <Mail size={20} />
                View My Anonymous Messages
                {messageCount > 0 && (
                  <span className="message-badge">{messageCount}</span>
                )}
              </Link>
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          © 2025 Whispers. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default WhispersUI;
