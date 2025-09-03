"use client";
import React, { useState, useRef, useEffect } from "react";
import { categories } from "@/lib/interacts";

const ComposeSection = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

export { ComposeSection };
