"use client";
import React, { useState } from "react";
import { categories } from "@/lib/interacts";
import { message } from "@/lib/type";

const AnonymousMessageCard: React.FC<{ message: message }> = ({ message }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(message.likes || 0);
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
        {/*<button
          className={`action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <span className="action-icon">♥</span>
          <span className="action-count">{likes.toLocaleString()}</span>
        </button>*/}

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

export { AnonymousMessageCard };
