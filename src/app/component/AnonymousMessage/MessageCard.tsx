"use client";
import React, { useState } from "react";
// Anonymous messages data

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

  return (
    <div className="whisper-card">
      <div className="whisper-header">
        <div className="user-avatar">?</div>
        <div className="whisper-content">
          <div className="whisper-text">{message.text}</div>
          <div className="whisper-time">{message.timestamp}</div>
        </div>
      </div>

      <div className="whisper-actions">
        <div
          className={`action-item ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          style={{ color: isLiked ? "#e91e63" : "var(--text-secondary)" }}
        >
          <span className="action-icon">♥</span>
          <span className="action-count">{likes.toLocaleString()}</span>
        </div>

        <div
          className={`action-item ${isBookmarked ? "bookmarked" : ""}`}
          onClick={handleBookmark}
          style={{ color: isBookmarked ? "#3b82f6" : "var(--text-secondary)" }}
        >
          <span className="action-icon">🔖</span>
          <span className="action-count">{message.bookmarks}</span>
        </div>

        <div className="action-item" onClick={handleShare}>
          <span className="action-icon">↗</span>
          <span className="action-count">Share</span>
        </div>
      </div>
    </div>
  );
};

export { AnonymousMessageCard };
