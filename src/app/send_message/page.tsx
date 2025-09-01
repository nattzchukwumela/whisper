"use client";
import React, { useState, useRef, useEffect } from "react";

const categories = [
  { name: "venting", emoji: "💭", color: "#8b5cf6" },
  { name: "confessions", emoji: "🤫", color: "#ef4444" },
  { name: "lonely", emoji: "🌙", color: "#3b82f6" },
  { name: "grateful", emoji: "🙏", color: "#10b981" },
  { name: "anxious", emoji: "😰", color: "#f59e0b" },
  { name: "happy", emoji: "✨", color: "#ec4899" },
];

const AnonymousMessageSender = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const textareaRef = useRef(null);
  const maxLength = 500;

  const handleMessageChange = (e) => {
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

  if (showSuccess) {
    return (
      <div className="success-container">
        <style>{`
          .success-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .success-content {
            text-align: center;
            max-width: 500px;
            color: #c9d1d9;
          }

          .success-icon {
            font-size: 64px;
            margin-bottom: 24px;
            animation: bounce 2s infinite;
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          .success-title {
            font-size: 32px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 16px;
          }

          .success-message {
            font-size: 18px;
            color: #8b949e;
            line-height: 1.6;
            margin-bottom: 24px;
          }

          .success-details {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 24px;
          }

          .success-details-text {
            font-size: 14px;
            color: #10b981;
            line-height: 1.5;
          }

          .loading-dots {
            display: inline-block;
            margin-left: 8px;
          }

          .loading-dots::after {
            content: '';
            animation: dots 1.5s steps(4, end) infinite;
          }

          @keyframes dots {
            0%, 20% {
              color: rgba(255, 255, 255, 0);
              text-shadow: 0.25em 0 0 rgba(255, 255, 255, 0),
                          0.5em 0 0 rgba(255, 255, 255, 0);
            }
            40% {
              color: white;
              text-shadow: 0.25em 0 0 rgba(255, 255, 255, 0),
                          0.5em 0 0 rgba(255, 255, 255, 0);
            }
            60% {
              text-shadow: 0.25em 0 0 white,
                          0.5em 0 0 rgba(255, 255, 255, 0);
            }
            80%, 100% {
              text-shadow: 0.25em 0 0 white,
                          0.5em 0 0 white;
            }
          }
        `}</style>

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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .message-form {
          background: #21262d;
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          border: 1px solid #30363d;
          width: 100%;
          max-width: 700px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: #c9d1d9;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 18px;
          color: #8b949e;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto;
        }

        .privacy-banner {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
          text-align: center;
        }

        .privacy-title {
          font-size: 18px;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .privacy-text {
          font-size: 14px;
          color: #8b949e;
          line-height: 1.5;
        }

        .privacy-toggle {
          background: none;
          border: none;
          color: #3b82f6;
          cursor: pointer;
          text-decoration: underline;
          font-size: 13px;
          margin-top: 8px;
        }

        .privacy-details {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          text-align: left;
        }

        .privacy-details ul {
          list-style: none;
          color: #8b949e;
          font-size: 13px;
          line-height: 1.6;
        }

        .privacy-details li {
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .privacy-details li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }

        .form-section {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #c9d1d9;
          margin-bottom: 12px;
        }

        .textarea-container {
          position: relative;
        }

        .message-textarea {
          width: 100%;
          min-height: 140px;
          max-height: 300px;
          background: #0d1117;
          border: 2px solid #30363d;
          border-radius: 12px;
          padding: 20px;
          color: #c9d1d9;
          font-size: 16px;
          line-height: 1.6;
          resize: none;
          outline: none;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .message-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .message-textarea::placeholder {
          color: #6b7280;
        }

        .textarea-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        .char-counter {
          font-size: 14px;
          color: #8b949e;
        }

        .char-counter.warning {
          color: #f59e0b;
        }

        .char-counter.danger {
          color: #ef4444;
        }

        .keyboard-hint {
          font-size: 12px;
          color: #6b7280;
        }

        .category-section {
          margin-bottom: 32px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 10px;
          background: #0d1117;
          border: 2px solid #30363d;
          color: #8b949e;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .category-btn:hover {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
          color: #c9d1d9;
        }

        .category-btn.selected {
          border-color: var(--category-color);
          background: var(--category-bg);
          color: var(--category-color);
        }

        .category-emoji {
          font-size: 20px;
        }

        .category-info {
          display: flex;
          flex-direction: column;
        }

        .category-name {
          font-size: 15px;
          font-weight: 600;
          text-transform: capitalize;
          margin-bottom: 2px;
        }

        .category-desc {
          font-size: 12px;
          opacity: 0.8;
        }

        .submit-section {
          text-align: center;
        }

        .submit-btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 200px;
          justify-content: center;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .submit-icon {
          font-size: 20px;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .final-privacy-note {
          margin-top: 24px;
          padding: 16px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 8px;
          text-align: center;
        }

        .final-privacy-text {
          font-size: 13px;
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .message-form {
            padding: 32px 24px;
          }

          .title {
            font-size: 28px;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .textarea-footer {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
      `}</style>

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
                    ? {
                        "--category-color": category.color,
                        "--category-bg": `${category.color}15`,
                      }
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
