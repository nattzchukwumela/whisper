import React, { useState, useEffect } from "react";

const UserNotFound = () => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    if (autoRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoRedirect && countdown === 0) {
      // In a real app, this would redirect to home page
      console.log("Redirecting to home page...");
    }
  }, [countdown, autoRedirect]);

  const handleStopRedirect = () => {
    setAutoRedirect(false);
  };

  const possibleReasons = [
    {
      icon: "🔗",
      title: "Broken or Invalid Link",
      description: "The link you clicked might be incorrect or incomplete",
      solution: "Double-check the URL or try copying the link again",
    },
    {
      icon: "⏰",
      title: "Expired Content",
      description: "The content you're looking for may no longer be available",
      solution: "Anonymous messages have limited visibility periods",
    },
    {
      icon: "🚫",
      title: "Content Removed",
      description:
        "The content might have been removed for community guidelines",
      solution: "Try browsing our current anonymous messages instead",
    },
    {
      icon: "🌐",
      title: "Network Issue",
      description: "There might be a temporary connection problem",
      solution: "Check your internet connection and try refreshing the page",
    },
  ];

  const quickActions = [
    {
      icon: "🏠",
      label: "Go to Home",
      description: "Browse all anonymous messages",
      action: () => console.log("Navigate to home"),
    },
    {
      icon: "✍️",
      label: "Share Anonymously",
      description: "Write your own message",
      action: () => console.log("Navigate to compose"),
    },
    {
      icon: "🔍",
      label: "Search Messages",
      description: "Find specific content",
      action: () => console.log("Navigate to search"),
    },
    {
      icon: "💭",
      label: "Browse Categories",
      description: "Explore by topic",
      action: () => console.log("Navigate to categories"),
    },
  ];

  return (
    <div className="error-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .error-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #c9d1d9;
        }

        .error-content {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }

        .error-animation {
          margin-bottom: 32px;
          position: relative;
        }

        .error-icon {
          font-size: 120px;
          margin-bottom: 16px;
          display: block;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .error-code {
          font-size: 24px;
          font-weight: 700;
          color: #ef4444;
          margin-bottom: 8px;
          letter-spacing: 2px;
        }

        .error-title {
          font-size: 36px;
          font-weight: 700;
          color: #c9d1d9;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .error-subtitle {
          font-size: 18px;
          color: #8b949e;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .redirect-notice {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .redirect-text {
          color: #3b82f6;
          font-size: 16px;
          font-weight: 500;
        }

        .countdown {
          background: #3b82f6;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 600;
          min-width: 40px;
        }

        .stop-redirect-btn {
          background: none;
          border: 1px solid #3b82f6;
          color: #3b82f6;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .stop-redirect-btn:hover {
          background: #3b82f6;
          color: white;
        }

        .main-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .action-card {
          background: #21262d;
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .action-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }

        .action-icon {
          font-size: 32px;
          margin-bottom: 12px;
          display: block;
        }

        .action-label {
          font-size: 16px;
          font-weight: 600;
          color: #c9d1d9;
          margin-bottom: 4px;
        }

        .action-description {
          font-size: 13px;
          color: #8b949e;
          line-height: 1.4;
        }

        .troubleshooting-section {
          margin-top: 48px;
        }

        .troubleshooting-toggle {
          background: none;
          border: none;
          color: #8b949e;
          cursor: pointer;
          font-size: 16px;
          padding: 12px;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto;
        }

        .troubleshooting-toggle:hover {
          color: #c9d1d9;
          background: rgba(255, 255, 255, 0.05);
        }

        .troubleshooting-content {
          margin-top: 24px;
          background: #21262d;
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 32px;
          text-align: left;
        }

        .troubleshooting-title {
          font-size: 20px;
          font-weight: 600;
          color: #c9d1d9;
          margin-bottom: 24px;
          text-align: center;
        }

        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .reason-card {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 20px;
        }

        .reason-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .reason-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .reason-title {
          font-size: 16px;
          font-weight: 600;
          color: #c9d1d9;
          margin-bottom: 4px;
        }

        .reason-description {
          font-size: 14px;
          color: #8b949e;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .reason-solution {
          font-size: 13px;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          border-left: 3px solid #10b981;
        }

        .support-section {
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid #30363d;
        }

        .support-title {
          font-size: 18px;
          font-weight: 600;
          color: #c9d1d9;
          margin-bottom: 12px;
        }

        .support-text {
          font-size: 14px;
          color: #8b949e;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .support-contact {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #3b82f6;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .support-contact:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .error-icon {
            font-size: 80px;
          }

          .error-title {
            font-size: 28px;
          }

          .main-actions {
            grid-template-columns: repeat(2, 1fr);
          }

          .reasons-grid {
            grid-template-columns: 1fr;
          }

          .redirect-notice {
            flex-direction: column;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .main-actions {
            grid-template-columns: 1fr;
          }

          .error-container {
            padding: 16px;
          }
        }
      `}</style>

      <div className="error-content">
        <div className="error-animation">
          <span className="error-icon">🔍</span>
          <div className="error-code">404</div>
          <h1 className="error-title">User Not Found</h1>
          <p className="error-subtitle">
            We couldn't find the user or content you're looking for. This might
            happen if the link is broken, expired, or if the content has been
            removed.
          </p>
        </div>

        {autoRedirect && (
          <div className="redirect-notice">
            <span className="redirect-text">Redirecting to home page in</span>
            <span className="countdown">{countdown}</span>
            <button className="stop-redirect-btn" onClick={handleStopRedirect}>
              Stay Here
            </button>
          </div>
        )}

        <div className="main-actions">
          {quickActions.map((action, index) => (
            <div key={index} className="action-card" onClick={action.action}>
              <span className="action-icon">{action.icon}</span>
              <div className="action-label">{action.label}</div>
              <div className="action-description">{action.description}</div>
            </div>
          ))}
        </div>

        <div className="troubleshooting-section">
          <button
            className="troubleshooting-toggle"
            onClick={() => setShowAlternatives(!showAlternatives)}
          >
            <span>{showAlternatives ? "🔽" : "▶️"}</span>
            {showAlternatives ? "Hide" : "Show"} troubleshooting tips
          </button>

          {showAlternatives && (
            <div className="troubleshooting-content">
              <h3 className="troubleshooting-title">
                What might have happened?
              </h3>
              <div className="reasons-grid">
                {possibleReasons.map((reason, index) => (
                  <div key={index} className="reason-card">
                    <div className="reason-header">
                      <span className="reason-icon">{reason.icon}</span>
                      <div>
                        <div className="reason-title">{reason.title}</div>
                        <div className="reason-description">
                          {reason.description}
                        </div>
                      </div>
                    </div>
                    <div className="reason-solution">
                      <strong>Solution:</strong> {reason.solution}
                    </div>
                  </div>
                ))}
              </div>

              <div className="support-section">
                <h4 className="support-title">Still need help?</h4>
                <p className="support-text">
                  If you continue to experience issues, our support team is here
                  to help. We maintain user privacy while providing technical
                  assistance.
                </p>
                <a href="#" className="support-contact">
                  <span>📧</span>
                  Contact Anonymous Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
