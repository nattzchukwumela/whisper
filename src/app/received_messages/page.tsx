"use client";
import React, { useState, useRef, useEffect } from "react";
import { initialMessages } from "@/lib/sampleData";
import { categories } from "@/lib/interacts";

const AnonymousMessageCard = ({ message }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(message.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        text: message.text,
        title: "Anonymous Message",
      });
    } else {
      navigator.clipboard.writeText(message.text);
      alert("Message copied to clipboard!");
    }
  };

  const categoryInfo = categories.find((cat) => cat.name === message.category);

  return (
    <div className="message-card">
      <div className="message-header">
        <div className="anonymous-avatar">?</div>
        <div className="message-content">
          <div className="message-text">{message.text}</div>
          <div className="message-meta">
            <span className="message-time">{message.timestamp}</span>
            {categoryInfo && (
              <span
                className="message-category"
                style={{
                  backgroundColor: `${categoryInfo.color}20`,
                  color: categoryInfo.color,
                }}
              >
                {categoryInfo.emoji} {categoryInfo.name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="message-actions">
        <button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <span className="action-icon">♥</span>
          <span className="action-count">{likes.toLocaleString()}</span>
        </button>

        <button
          className={`action-btn ${isBookmarked ? "bookmarked" : ""}`}
          onClick={handleBookmark}
        >
          <span className="action-icon">🔖</span>
          <span className="action-count">{message.bookmarks}</span>
        </button>

        <button className="action-btn" onClick={handleShare}>
          <span className="action-icon">↗</span>
          <span className="action-count">Share</span>
        </button>
      </div>
    </div>
  );
};

const ComposeSection = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef(null);
  const maxLength = 500;

  const handleMessageChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  const handleSubmit = () => {
    if (message.trim() && selectedCategory) {
      onSubmit({
        text: message.trim(),
        category: selectedCategory,
      });
      setMessage("");
      setSelectedCategory("");
      setCharCount(0);
      setShowPreview(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="compose-section">
      <div className="compose-header">
        <div className="anonymous-avatar small">?</div>
        <h3 className="compose-title">Share anonymously</h3>
      </div>

      <div className="compose-form">
        <textarea
          ref={textareaRef}
          className="compose-textarea"
          placeholder="What's on your mind? Your message will be completely anonymous..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          rows={3}
        />

        <div className="compose-meta">
          <div className="char-counter">
            <span className={charCount > maxLength * 0.8 ? "warning" : ""}>
              {charCount}/{maxLength}
            </span>
          </div>
        </div>

        <div className="category-selector">
          <label className="category-label">Choose a category:</label>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-btn ${selectedCategory === category.name ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category.name)}
                style={
                  selectedCategory === category.name
                    ? {
                        backgroundColor: `${category.color}20`,
                        borderColor: category.color,
                        color: category.color,
                      }
                    : {}
                }
              >
                <span className="category-emoji">{category.emoji}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {message.trim() && selectedCategory && (
          <div className="preview-section">
            <button
              className="preview-toggle"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "👁️ Hide Preview" : "👁️ Show Preview"}
            </button>

            {showPreview && (
              <div className="message-preview">
                <div className="preview-card">
                  <div className="message-header">
                    <div className="anonymous-avatar">?</div>
                    <div className="message-content">
                      <div className="message-text">{message}</div>
                      <div className="message-meta">
                        <span className="message-time">just now</span>
                        <span
                          className="message-category"
                          style={{
                            backgroundColor: `${categories.find((c) => c.name === selectedCategory)?.color}20`,
                            color: categories.find(
                              (c) => c.name === selectedCategory,
                            )?.color,
                          }}
                        >
                          {
                            categories.find((c) => c.name === selectedCategory)
                              ?.emoji
                          }{" "}
                          {selectedCategory}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="compose-actions">
          <div className="privacy-notice">
            <span className="privacy-icon">🔒</span>
            <span className="privacy-text">Completely anonymous & secure</span>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!message.trim() || !selectedCategory}
          >
            <span className="submit-icon">✨</span>
            Send Anonymously
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ activeFilter, onFilterChange }) => {
  const allCategories = [
    { name: "all", emoji: "🌟", label: "All Messages" },
    ...categories.map((cat) => ({ ...cat, label: cat.name })),
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <span className="app-icon">💭</span>
          Anonymous
        </h2>
        <p className="sidebar-subtitle">Share your thoughts freely</p>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-list">
          {allCategories.map((category) => (
            <button
              key={category.name}
              className={`filter-item ${activeFilter === category.name ? "active" : ""}`}
              onClick={() => onFilterChange(category.name)}
            >
              <span className="filter-emoji">{category.emoji}</span>
              <span className="filter-label">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-title">Community Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">2.1K</div>
            <div className="stat-label">Messages Today</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">45K</div>
            <div className="stat-label">Total Messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnonymousMessagePlatform = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCompose, setShowCompose] = useState(false);

  const filteredMessages =
    activeFilter === "all"
      ? messages
      : messages.filter((msg) => msg.category === activeFilter);

  const handleSubmitMessage = (newMessage) => {
    const message = {
      id: Date.now(),
      text: newMessage.text,
      category: newMessage.category,
      timestamp: "just now",
      likes: 0,
      bookmarks: 0,
    };

    setMessages([message, ...messages]);
    setShowCompose(false);

    // Show success notification
    setTimeout(() => {
      alert("Your anonymous message has been shared! 🎉");
    }, 100);
  };

  return (
    <div className="app-container">
      <style>{`
        :root {
          --background-color: #0d1117;
          --card-background: #161b22;
          --primary-blue: #3b82f6;
          --text-primary: #c9d1d9;
          --text-secondary: #8b949e;
          --border-color: #30363d;
          --success-color: #10b981;
          --warning-color: #f59e0b;
          --danger-color: #ef4444;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--background-color);
          color: var(--text-primary);
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background-color: var(--card-background);
          border-right: 1px solid var(--border-color);
          padding: 24px;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-header {
          margin-bottom: 32px;
        }

        .sidebar-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .app-icon {
          font-size: 28px;
        }

        .sidebar-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .filter-section {
          margin-bottom: 32px;
        }

        .filter-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .filter-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .filter-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }

        .filter-item:hover {
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--text-primary);
        }

        .filter-item.active {
          background-color: var(--primary-blue);
          color: white;
        }

        .filter-emoji {
          font-size: 18px;
        }

        .filter-label {
          font-size: 15px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .stats-section {
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .stats-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-blue);
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 24px;
          max-width: 800px;
        }

        .main-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 24px;
        }

        .compose-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-blue), #8b5cf6);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          transition: transform 0.2s;
          z-index: 1000;
        }

        .compose-toggle:hover {
          transform: scale(1.1);
        }

        /* Compose Section */
        .compose-section {
          background-color: var(--card-background);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
        }

        .compose-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .compose-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .compose-textarea {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 16px;
          color: var(--text-primary);
          font-size: 16px;
          line-height: 1.5;
          resize: none;
          min-height: 120px;
          max-height: 300px;
          outline: none;
          font-family: inherit;
        }

        .compose-textarea:focus {
          border-color: var(--primary-blue);
        }

        .compose-textarea::placeholder {
          color: var(--text-secondary);
        }

        .compose-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 12px 0;
        }

        .char-counter {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .char-counter .warning {
          color: var(--warning-color);
        }

        .category-selector {
          margin: 20px 0;
        }

        .category-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 8px;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .category-btn:hover {
          border-color: var(--primary-blue);
          color: var(--text-primary);
        }

        .category-btn.selected {
          border-color: var(--primary-blue);
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--primary-blue);
        }

        .category-emoji {
          font-size: 16px;
        }

        .category-name {
          font-size: 14px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .preview-section {
          margin: 20px 0;
        }

        .preview-toggle {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .preview-toggle:hover {
          border-color: var(--primary-blue);
          color: var(--text-primary);
        }

        .message-preview {
          margin-top: 16px;
          padding: 16px;
          background-color: rgba(59, 130, 246, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .preview-card {
          opacity: 0.8;
        }

        .compose-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .privacy-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 13px;
        }

        .privacy-icon {
          font-size: 16px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--primary-blue), #8b5cf6);
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .submit-icon {
          font-size: 16px;
        }

        /* Message Cards */
        .messages-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-card {
          background-color: var(--card-background);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }

        .message-card:hover {
          border-color: var(--primary-blue);
          transform: translateY(-1px);
        }

        .message-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }

        .anonymous-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-blue), #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }

        .anonymous-avatar.small {
          width: 32px;
          height: 32px;
          font-size: 14px;
        }

        .message-content {
          flex: 1;
        }

        .message-text {
          color: var(--text-primary);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .message-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .message-time {
          color: var(--text-secondary);
          font-size: 13px;
        }

        .message-category {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .message-actions {
          display: flex;
          gap: 20px;
          padding-left: 52px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s;
          font-size: 14px;
        }

        .action-btn:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .action-btn.liked {
          color: #e91e63;
        }

        .action-btn.bookmarked {
          color: var(--primary-blue);
        }

        .action-icon {
          font-size: 16px;
        }

        .action-count {
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar {
            width: 240px;
          }

          .main-content {
            margin-left: 240px;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: -280px;
            z-index: 1000;
            transition: left 0.3s;
          }

          .main-content {
            margin-left: 0;
            padding: 16px;
          }

          .message-actions {
            padding-left: 0;
            margin-top: 12px;
          }

          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="main-content">
        {showCompose && <ComposeSection onSubmit={handleSubmitMessage} />}

        <div className="messages-feed">
          {filteredMessages.map((message) => (
            <AnonymousMessageCard key={message.id} message={message} />
          ))}

          {filteredMessages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "var(--text-secondary)",
              }}
            >
              No messages in this category yet. Be the first to share!
            </div>
          )}
        </div>
      </div>

      <button
        className="compose-toggle"
        onClick={() => setShowCompose(!showCompose)}
        title={showCompose ? "Close compose" : "Write anonymous message"}
      >
        {showCompose ? "×" : "+"}
      </button>
    </div>
  );
};

export default AnonymousMessagePlatform;
