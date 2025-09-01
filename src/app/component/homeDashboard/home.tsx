import React from "react";
import {
  Bell,
  Bookmark,
  Globe,
  Home,
  MessageCircle,
  MessageCircleQuestion,
  Pin,
  Save,
  User,
} from "lucide-react";
import "./home.css";
/* CSS styles will be included below */

// Types
interface Whisper {
  id: string;
  user: string;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  userInitials: string;
  userColor: string;
}

interface PopularWhisper {
  id: string;
  content: string;
  timeAgo: string;
  userInitials: string;
  userColor: string;
}

// Sample data
const whispers: Whisper[] = [
  {
    id: "1",
    user: "u1",
    content: "I'm so tired of pretending to be okay. It's exhausting.",
    timeAgo: "3h ago",
    likes: 1200,
    comments: 34,
    userInitials: "u1",
    userColor: "#3b82f6",
  },
  {
    id: "2",
    user: "u2",
    content: "Sometimes I just want to disappear and start over somewhere new.",
    timeAgo: "4h ago",
    likes: 987,
    comments: 21,
    userInitials: "u2",
    userColor: "#ef4444",
  },
  {
    id: "3",
    user: "u3",
    content: "I wish I could go back in time and change so many things.",
    timeAgo: "6h ago",
    likes: 812,
    comments: 15,
    userInitials: "u3",
    userColor: "#8b5cf6",
  },
];

const popularWhispers: PopularWhisper[] = [
  {
    id: "1",
    content: "I'm so grateful for the little things in life.",
    timeAgo: "12h ago",
    userInitials: "u4",
    userColor: "#3b82f6",
  },
  {
    id: "2",
    content: "I'm trying to focus on the present moment.",
    timeAgo: "14h ago",
    userInitials: "u5",
    userColor: "#06b6d4",
  },
  {
    id: "3",
    content: "I'm learning to be kinder to myself.",
    timeAgo: "16h ago",
    userInitials: "u6",
    userColor: "#8b5cf6",
  },
];

const trendingTopics = ["venting", "confessions", "lonely"];
const emergingCommunities = ["Mental Health", "Self Care", "Gratitude"];

// Components
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <nav className="nav">
        <div className="nav-item active">
          <span className="nav-icon">
            <Home />
          </span>
          <span className="nav-text">Home</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">
            <MessageCircle />{" "}
          </span>
          <span className="nav-text">My Messages</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">
            <MessageCircleQuestion />{" "}
          </span>
          <span className="nav-text">Anonymous Messages</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">
            <Bookmark />
          </span>
          <span className="nav-text">Saved Whispers</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">
            <User />{" "}
          </span>
          <span className="nav-text">My Profile</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">
            <Globe />{" "}
          </span>
          <span className="nav-text">Explore</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">
            <Bell />{" "}
          </span>
          <span className="nav-text">Notification</span>
        </div>
      </nav>

      <div className="trending-section">
        <h3 className="section-title">TRENDING TOPICS</h3>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="trending-item">
            <span className="trending-hash">#</span>
            <span className="trending-text">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="compose-section">
        <div className="user-avatar compose-avatar">A</div>
        <input
          type="text"
          placeholder="What's on your mind? Make a Whisper..."
          className="compose-input"
        />
      </div>

      <div className="whispers-feed">
        {whispers.map((whisper) => (
          <WhisperCard key={whisper.id} whisper={whisper} />
        ))}
      </div>

      <div className="load-more">
        <button className="load-more-btn">⟳</button>
        <button className="refresh-btn">↻</button>
      </div>
    </div>
  );
};

const WhisperCard: React.FC<{ whisper: Whisper }> = ({ whisper }) => {
  return (
    <div className="whisper-card">
      <div className="whisper-header">
        <div
          className="user-avatar"
          style={{ backgroundColor: whisper.userColor }}
        >
          {whisper.userInitials}
        </div>
        <div className="whisper-content">
          <p className="whisper-text">{whisper.content}</p>
          <span className="whisper-time">{whisper.timeAgo}</span>
        </div>
      </div>

      <div className="whisper-actions">
        <div className="action-item">
          <span className="action-icon">🤍</span>
          <span className="action-count">{whisper.likes.toLocaleString()}</span>
        </div>
        <div className="action-item">
          <span className="action-icon">💬</span>
          <span className="action-count">{whisper.comments}</span>
        </div>
        <div className="action-item">
          <span className="action-icon">↗</span>
        </div>
      </div>
    </div>
  );
};

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-section">
        <h3 className="section-title">Popular Whispers</h3>
        {popularWhispers.map((whisper) => (
          <div key={whisper.id} className="popular-whisper">
            <div
              className="user-avatar small"
              style={{ backgroundColor: whisper.userColor }}
            >
              {whisper.userInitials}
            </div>
            <div className="popular-content">
              <p className="popular-text">{whisper.content}</p>
              <span className="popular-time">{whisper.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Emerging Communities</h3>
        {emergingCommunities.map((community, index) => (
          <div key={index} className="community-item">
            <span className="community-hash">#</span>
            <span className="community-text">{community}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Anonymity Tips</h3>
        <p className="tips-text">
          Your identity is always protected. Share freely and without fear of
          judgment. Avoid sharing personal information.
        </p>
      </div>
    </div>
  );
};

const SocialMediaApp: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default SocialMediaApp;
