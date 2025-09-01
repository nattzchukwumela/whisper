import {
  Bell,
  Home,
  MessageCircle,
  MessageCircleQuestion,
  Bookmark,
  User,
  Compass,
} from "lucide-react";
import { trendingTopics } from "@/lib/sampleData";
import Link from "next/link";
import { activeNavType } from "@/lib/type";

const LeftSidebar: React.FC<activeNavType> = ({ activeNav }) => {
  return (
    <div className="sidebar">
      <nav className="nav">
        <div className={`nav-item ${activeNav === "home" ? "active" : ""}`}>
          <span className="nav-icon">
            <Home />
          </span>
          <span className="nav-text">Home</span>
        </div>
        <div className={`nav-item ${activeNav === "message" ? "active" : ""}`}>
          <span className="nav-icon">
            <MessageCircle />{" "}
          </span>
          <span className="nav-text">My Messages</span>
        </div>
        <Link
          href="/anonymous_message"
          className={`nav-item ${activeNav === "anonymous_messages" ? "active" : ""}`}
        >
          {/*<div>*/}
          <span className="nav-icon">
            <MessageCircleQuestion />{" "}
          </span>
          <span className="nav-text">Anonymous Messages</span>
          {/*</div>*/}
        </Link>
        <div
          className={`nav-item ${activeNav === "saved_whispers" ? "active" : ""}`}
        >
          <span className="nav-icon">
            <Bookmark />
          </span>
          <span className="nav-text">Saved Whispers</span>
        </div>
        <div className={`nav-item ${activeNav === "profile" ? "active" : ""}`}>
          <span className="nav-icon">
            <User />{" "}
          </span>
          <span className="nav-text">My Profile</span>
        </div>
        <div className={`nav-item ${activeNav === "explore" ? "active" : ""}`}>
          <span className="nav-icon">
            <Compass />{" "}
          </span>
          <span className="nav-text">Explore</span>
        </div>
        <div
          className={`nav-item ${activeNav === "notification" ? "active" : ""}`}
        >
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

export { LeftSidebar };
