"use client";
import React, { useState, useRef, useEffect } from "react";
import { categories } from "@/lib/interacts";

import "./style.css";

const AnonymousMessageSender = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  const handleSubmit = async () => {
    if (message.trim() && selectedCategory) {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setMessage("");
        setSelectedCategory("");
        setCharCount(0);
        setShowSuccess(false);
      }, 3000);
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

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-content">
          <div className="success-icon">🎉</div>
          <h1 className="success-title">Message Sent!</h1>
          <p className="success-message">
            Your anonymous message has been shared with the community.
          </p>
          <div className="success-details">
            <p className="success-details-text">
              ✓ Completely anonymous
              <br />
              ✓ No data stored
              <br />
              ✓ No tracking information
              <br />✓ Message delivered securely
            </p>
          </div>
          <p className="success-message">
            Returning to message form<span className="loading-dots">...</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="message-form">
        <div className="header">
          <div className="logo">💭</div>
          <h1 className="title">Share Anonymously</h1>
          <p className="subtitle">
            Express yourself freely in a safe, anonymous space. Your thoughts
            matter, and your privacy is protected.
          </p>
        </div>

        <div className="privacy-banner">
          <h3 className="privacy-title">🔒 Complete Privacy Guaranteed</h3>
          <p className="privacy-text">
            Your message is sent completely anonymously with no data stored or
            tracked.
          </p>
          <button
            className="privacy-toggle"
            onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
          >
            {showPrivacyDetails
              ? "Hide details"
              : "Learn more about our privacy"}
          </button>

          {showPrivacyDetails && (
            <div className="privacy-details">
              <ul>
                <li>No personal information collected or stored</li>
                <li>No IP addresses logged or tracked</li>
                <li>No cookies or tracking pixels used</li>
                <li>
                  Messages are processed and immediately discarded from our
                  servers
                </li>
                <li>No analytics or user behavior tracking</li>
                <li>Complete anonymity maintained at all times</li>
              </ul>
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="message" className="form-label">
            What's on your mind?
          </label>
          <div className="textarea-container">
            <textarea
              id="message"
              ref={textareaRef}
              className="message-textarea"
              placeholder="Share your thoughts, feelings, or experiences... This is a safe space to express yourself without judgment."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
            />
            <div className="textarea-footer">
              <span
                className={`char-counter ${
                  charCount > maxLength * 0.9
                    ? "danger"
                    : charCount > maxLength * 0.7
                      ? "warning"
                      : ""
                }`}
              >
                {charCount}/{maxLength} characters
              </span>
              <span className="keyboard-hint">Press Ctrl+Enter to submit</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Choose a category</label>
          <div className="category-grid">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-btn ${selectedCategory === category.name ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category.name)}
                disabled={isSubmitting}
                style={
                  selectedCategory === category.name
                    ? ({
                        "--category-color": category.color,
                        "--category-bg": `${category.color}15`,
                      } as React.CSSProperties)
                    : {}
                }
              >
                <span className="category-emoji">{category.emoji}</span>
                <div className="category-info">
                  <span className="category-name">{category.name}</span>
                  <span className="category-desc">
                    {category.name === "venting" && "Let it out"}
                    {category.name === "confessions" && "Share secrets"}
                    {category.name === "lonely" && "You're not alone"}
                    {category.name === "grateful" && "Count blessings"}
                    {category.name === "anxious" && "Find support"}
                    {category.name === "happy" && "Spread joy"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="submit-section">
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!message.trim() || !selectedCategory || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner"></div>
                Sending Anonymously...
              </>
            ) : (
              <>
                <span className="submit-icon">✨</span>
                Send Anonymously
              </>
            )}
          </button>

          <div className="final-privacy-note">
            <p className="final-privacy-text">
              <span>🛡️</span>
              This message will be shared anonymously with no way to trace it
              back to you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousMessageSender;
