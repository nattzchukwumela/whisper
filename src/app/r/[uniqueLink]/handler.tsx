"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Heart,
  Frown,
  Users,
  Moon,
  Sun,
  List,
  Share2,
  Download,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  Link,
} from "lucide-react";
import { categories } from "@/lib/interacts";
import { message, platformsTypes } from "@/lib/type";

const WhispersMessagesPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Messages");
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  const messages: message[] = [
    {
      id: 1,
      category: "venting",
      text: "I'm so frustrated with my job. It's like I'm constantly hitting a wall, and no matter how hard I try, I can't seem to make any progress. It's exhausting and demoralizing.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      category: "confessions",
      text: "I have a secret crush on my best friend's sibling. It's been going on for months, and I can't seem to shake it. I know it's wrong, but I can't help how I feel.",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      category: "lonely",
      text: "I feel so alone sometimes. It's like I'm surrounded by people, but I still feel like an outsider. I wish I could find someone who truly understands me.",
      timestamp: "6 hours ago",
    },
    {
      id: 4,
      category: "love",
      text: "My partner and I have been drifting apart lately. We used to be so close, but now it feels like we're living separate lives. I'm not sure how to fix it.",
      timestamp: "8 hours ago",
    },
    {
      id: 5,
      category: "anxious",
      text: "I have a big presentation tomorrow and I can't sleep. My mind keeps racing with all the things that could go wrong. Why do I always do this to myself?",
      timestamp: "12 hours ago",
    },
    {
      id: 6,
      category: "grateful",
      text: "Today someone held the door for me when I was struggling with groceries. Such a small act, but it completely changed my mood. Sometimes kindness is everything.",
      timestamp: "1 day ago",
    },
  ];

  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, color: "#1da1f2" },
    { name: "Facebook", icon: Facebook, color: "#4267b2" },
    { name: "WhatsApp", icon: MessageCircle, color: "#25d366" },
    { name: "Copy Link", icon: Copy, color: "#6b7280" },
  ];

  const filteredMessages =
    selectedCategory === "All Messages"
      ? messages
      : messages.filter((msg) => msg.category === selectedCategory);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const getCategoryInfo = (categoryName: string) => {
    return categories.find((cat) => cat.name === categoryName) || categories[0];
  };

  const handleShare = (messageId: number, platform: platformsTypes) => {
    const message = messages.find((m) => m.id === messageId);
    const shareText = `"${message?.text}" - Anonymous message from Whispers`;
    const shareUrl = `${window.location.origin}/message/${messageId}`;

    switch (platform) {
      case "Twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "Facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "WhatsApp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        );
        break;
      case "Copy Link":
        navigator.clipboard.writeText(shareUrl);
        break;
    }
    setShareMenuOpen(null);
  };

  const handleDownloadImage = (messageId: number) => {
    // Placeholder for download functionality
    console.log(`Download image for message ${messageId}`);
    // You'll implement this with html2canvas or similar
  };

  return (
    <div className={`messages-container ${isDark ? "dark" : "light"}`}>
      <div className="messages-layout">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="app-title">Anonymous</h1>
            <p className="app-subtitle">Share your thoughts freely</p>
          </div>

          <nav className="navigation">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`nav-item ${selectedCategory === category.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.name)}
                style={
                  { "--category-color": category.color } as React.CSSProperties
                }
              >
                <span className="nav-emoji">{category.emoji}</span>
                <span className="nav-text">
                  {category.name === "work_school"
                    ? "Work & School"
                    : category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h2 className="page-title">
              {selectedCategory === "All Messages"
                ? "All Messages"
                : getCategoryInfo(selectedCategory).emoji +
                  " " +
                  (selectedCategory === "work_school"
                    ? "Work & School"
                    : selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1))}
            </h2>
            <p className="message-count">{filteredMessages.length} messages</p>
          </div>

          <div className="messages-grid">
            {filteredMessages.map((message) => {
              const categoryInfo = getCategoryInfo(message.category);
              return (
                <div key={message.id} className="message-wrapper">
                  <div
                    className="message-card"
                    style={
                      {
                        "--message-color": categoryInfo.color,
                      } as React.CSSProperties
                    }
                  >
                    <div className="message-header">
                      <div className="category-badge">
                        <span className="category-emoji">
                          {categoryInfo.emoji}
                        </span>
                        <span className="category-name">
                          {message.category === "work_school"
                            ? "Work & School"
                            : message.category.charAt(0).toUpperCase() +
                              message.category.slice(1)}
                        </span>
                      </div>
                      <div className="message-actions">
                        <div className="share-container">
                          <button
                            className="action-btn share-btn"
                            onClick={() =>
                              setShareMenuOpen(
                                shareMenuOpen === message.id
                                  ? null
                                  : message.id,
                              )
                            }
                          >
                            <Share2 size={16} />
                          </button>
                          {shareMenuOpen === message.id && (
                            <div className="share-menu">
                              {socialPlatforms.map((platform) => {
                                const IconComponent = platform.icon;
                                return (
                                  <button
                                    key={platform.name}
                                    className="share-option"
                                    onClick={() =>
                                      handleShare(
                                        message.id,
                                        platform.name as platformsTypes,
                                      )
                                    }
                                    style={
                                      {
                                        "--platform-color": platform.color,
                                      } as React.CSSProperties
                                    }
                                  >
                                    <IconComponent size={16} />
                                    <span>{platform.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <button
                          className="action-btn download-btn"
                          onClick={() => handleDownloadImage(message.id)}
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="message-content">{message.text}</p>
                    <div className="message-footer">
                      <span className="timestamp">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <style jsx>{`
        .messages-container {
          min-height: 100vh;
          transition: all 0.3s ease;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
        }

        .messages-container.dark {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f1f5f9;
        }

        .messages-container.light {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          color: #0f172a;
        }

        .messages-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          min-height: 100vh;
        }

        .theme-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px;
          border-radius: 12px;
          transition: all 0.2s ease;
          z-index: 100;
        }

        .dark .theme-toggle {
          color: #94a3b8;
          background: rgba(71, 85, 105, 0.3);
        }

        .light .theme-toggle {
          color: #475569;
          background: rgba(148, 163, 184, 0.2);
        }

        .theme-toggle:hover {
          transform: translateY(-1px);
        }

        .dark .theme-toggle:hover {
          background: rgba(71, 85, 105, 0.5);
        }

        .light .theme-toggle:hover {
          background: rgba(148, 163, 184, 0.3);
        }

        .sidebar {
          padding: 40px 24px;
          border-right: 1px solid;
          backdrop-filter: blur(10px);
        }

        .dark .sidebar {
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(71, 85, 105, 0.3);
        }

        .light .sidebar {
          background: rgba(255, 255, 255, 0.7);
          border-color: rgba(148, 163, 184, 0.2);
        }

        .sidebar-header {
          margin-bottom: 32px;
        }

        .app-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(
            135deg,
            #6366f1 0%,
            #8b5cf6 50%,
            #d946ef 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .app-subtitle {
          font-size: 0.875rem;
          margin: 0;
          opacity: 0.6;
        }

        .navigation {
          display: flex;
          flex-direction: column;
          gap: 3px;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
        }

        .navigation::-webkit-scrollbar {
          width: 4px;
        }

        .navigation::-webkit-scrollbar-track {
          background: transparent;
        }

        .dark .navigation::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 2px;
        }

        .light .navigation::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: none;
          border-radius: 10px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          background: none;
          width: 100%;
          font-size: 0.9rem;
          position: relative;
        }

        .dark .nav-item {
          color: #cbd5e1;
        }

        .light .nav-item {
          color: #475569;
        }

        .nav-item:hover {
          transform: translateX(4px);
        }

        .dark .nav-item:hover {
          background: rgba(71, 85, 105, 0.3);
          color: #f1f5f9;
        }

        .light .nav-item:hover {
          background: rgba(148, 163, 184, 0.2);
          color: #0f172a;
        }

        .nav-item.active {
          font-weight: 600;
          border-left: 3px solid var(--category-color);
          padding-left: 13px;
        }

        .dark .nav-item.active {
          background: rgba(71, 85, 105, 0.4);
          color: #f1f5f9;
        }

        .light .nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
        }

        .nav-emoji {
          font-size: 1.1rem;
        }

        .nav-text {
          flex: 1;
        }

        .main-content {
          padding: 40px;
          overflow-y: auto;
        }

        .content-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .message-count {
          font-size: 0.875rem;
          margin: 0;
          opacity: 0.6;
        }

        .messages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          max-width: 1400px;
        }

        .message-wrapper {
          display: flex;
        }

        .message-card {
          width: 100%;
          padding: 24px;
          border-radius: 16px;
          transition: all 0.2s ease;
          position: relative;
          overflow: visible;
          backdrop-filter: blur(10px);
          border: 2px solid;
          border-color: var(--message-color);
        }

        .dark .message-card {
          background: rgba(15, 23, 42, 0.8);
          color: #f1f5f9;
        }

        .light .message-card {
          background: rgba(255, 255, 255, 0.9);
          color: #0f172a;
        }

        .message-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .category-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          background-color: var(--message-color);
          color: white;
        }

        .category-emoji {
          font-size: 0.9rem;
        }

        .message-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          opacity: 0.6;
        }

        .dark .action-btn {
          color: #cbd5e1;
        }

        .light .action-btn {
          color: #475569;
        }

        .action-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .dark .action-btn:hover {
          background: rgba(71, 85, 105, 0.3);
        }

        .light .action-btn:hover {
          background: rgba(148, 163, 184, 0.2);
        }

        .share-container {
          position: relative;
        }

        .share-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          padding: 8px;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25);
          border: 1px solid;
          backdrop-filter: blur(10px);
          z-index: 50;
          min-width: 160px;
        }

        .dark .share-menu {
          background: rgba(15, 23, 42, 0.95);
          border-color: rgba(71, 85, 105, 0.3);
        }

        .light .share-menu {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(148, 163, 184, 0.2);
        }

        .share-option {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
          background: none;
        }

        .dark .share-option {
          color: #cbd5e1;
        }

        .light .share-option {
          color: #475569;
        }

        .share-option:hover {
          background: var(--platform-color);
          color: white;
          transform: translateX(4px);
        }

        .message-content {
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 16px 0;
          opacity: 0.9;
        }

        .message-footer {
          display: flex;
          justify-content: flex-end;
        }

        .timestamp {
          font-size: 0.8rem;
          opacity: 0.5;
          font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .messages-layout {
            grid-template-columns: 280px 1fr;
          }

          .main-content {
            padding: 24px;
          }

          .messages-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .messages-layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            display: none;
          }

          .main-content {
            padding: 20px;
          }

          .theme-toggle {
            top: 16px;
            right: 16px;
          }

          .messages-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .share-menu {
            right: auto;
            left: 0;
          }
        }

        @media (max-width: 640px) {
          .main-content {
            padding: 16px;
          }

          .messages-grid {
            gap: 12px;
            grid-template-columns: 1fr;
          }

          .message-card {
            padding: 20px;
          }

          .content-header {
            margin-bottom: 24px;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export { WhispersMessagesPage };
