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
import { Sidebar } from "../homesiderbar/HomeSideBar";
import { MainContent } from "../maincontent/MainContent";
/* CSS styles will be included below */

interface PopularWhisper {
  id: string;
  content: string;
  timeAgo: string;
  userInitials: string;
  userColor: string;
}

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

const emergingCommunities = ["Mental Health", "Self Care", "Gratitude"];

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
