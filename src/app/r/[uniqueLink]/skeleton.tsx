import React from "react";
import { MessageSquare, Moon, Sun } from "lucide-react";

const MessagesLoadingSkeleton = ({ isDark = true }) => {
  // Generate skeleton items for sidebar navigation
  const sidebarSkeletonItems = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="nav-item-skeleton">
      <div className="skeleton-emoji"></div>
      <div className="skeleton-text"></div>
    </div>
  ));

  // Generate skeleton cards for messages
  const messageSkeletonCards = Array.from({ length: 6 }, (_, i) => (
    <div key={i} className="message-card-skeleton">
      <div className="message-header-skeleton">
        <div className="category-badge-skeleton"></div>
        <div className="message-actions-skeleton">
          <div className="action-btn-skeleton"></div>
          <div className="action-btn-skeleton"></div>
        </div>
      </div>
      <div className="message-content-skeleton">
        <div className="skeleton-line long"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
      </div>
      <div className="message-footer-skeleton">
        <div className="timestamp-skeleton"></div>
      </div>
    </div>
  ));

  return (
    <div className={`messages-container ${isDark ? "dark" : "light"}`}>
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

        .nav-item-skeleton {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          width: 100%;
        }

        .skeleton-emoji {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .skeleton-emoji {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .skeleton-emoji {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .skeleton-text {
          flex: 1;
          height: 16px;
          border-radius: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .skeleton-text {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .skeleton-text {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .main-content {
          padding: 40px;
          overflow-y: auto;
        }

        .content-header {
          margin-bottom: 32px;
        }

        .page-title-skeleton {
          width: 300px;
          height: 32px;
          border-radius: 8px;
          margin-bottom: 8px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .page-title-skeleton {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .page-title-skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .message-count-skeleton {
          width: 120px;
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .message-count-skeleton {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .message-count-skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .messages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          max-width: 1400px;
        }

        .message-card-skeleton {
          width: 100%;
          padding: 24px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 2px solid;
        }

        .dark .message-card-skeleton {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(71, 85, 105, 0.3);
        }

        .light .message-card-skeleton {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(148, 163, 184, 0.2);
        }

        .message-header-skeleton {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .category-badge-skeleton {
          width: 100px;
          height: 28px;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .category-badge-skeleton {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .category-badge-skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .message-actions-skeleton {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .action-btn-skeleton {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .action-btn-skeleton {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .action-btn-skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .message-content-skeleton {
          margin: 0 0 16px 0;
        }

        .skeleton-line {
          height: 16px;
          border-radius: 4px;
          margin-bottom: 8px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .skeleton-line {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .skeleton-line {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        .skeleton-line.long {
          width: 100%;
        }

        .skeleton-line.medium {
          width: 80%;
        }

        .skeleton-line.short {
          width: 60%;
        }

        .message-footer-skeleton {
          display: flex;
          justify-content: flex-end;
        }

        .timestamp-skeleton {
          width: 80px;
          height: 12px;
          border-radius: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .dark .timestamp-skeleton {
          background: linear-gradient(
            90deg,
            rgba(71, 85, 105, 0.3),
            rgba(71, 85, 105, 0.6),
            rgba(71, 85, 105, 0.3)
          );
        }

        .light .timestamp-skeleton {
          background: linear-gradient(
            90deg,
            rgba(148, 163, 184, 0.2),
            rgba(148, 163, 184, 0.4),
            rgba(148, 163, 184, 0.2)
          );
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
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
        }

        @media (max-width: 640px) {
          .main-content {
            padding: 16px;
          }

          .messages-grid {
            gap: 12px;
            grid-template-columns: 1fr;
          }

          .message-card-skeleton {
            padding: 20px;
          }

          .content-header {
            margin-bottom: 24px;
          }

          .page-title-skeleton {
            width: 200px;
            height: 24px;
          }
        }
      `}</style>

      <div className="messages-layout">
        {/* Theme Toggle */}
        <button className="theme-toggle">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="app-title">Anonymous</h1>
            <p className="app-subtitle">Share your thoughts freely</p>
          </div>

          <nav className="navigation">{sidebarSkeletonItems}</nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <div className="page-title-skeleton"></div>
            <div className="message-count-skeleton"></div>
          </div>

          <div className="messages-grid">{messageSkeletonCards}</div>
        </main>
      </div>
    </div>
  );
};

export default MessagesLoadingSkeleton;
